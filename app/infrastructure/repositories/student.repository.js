const StudentRepository = require('@domain/repositories/student.repository')
const Database = require('@models/mysql/connection')
const utils = require('@utils/index')

const Student = Database.students
const Op = Database.Sequelize.Op

class StudentRepositoryMySQL extends StudentRepository {
    async find(filter, pagination = {}) {
        const { limit = 10, offset = 0 } = pagination

        const condition = filter.search
            ? {
                  [Op.or]: [
                      { name: { [Op.like]: `%${filter.search}%` } },
                      { grade: { [Op.like]: `%${filter.search}%` } },
                  ],
              }
            : {}

        const result = await Student.findAndCountAll({
            where: condition,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']],
        })

        return {
            data: result.rows,
            total: result.count,
            limit: parseInt(limit),
            offset: parseInt(offset),
        }
    }

    async findById(id) {
        return Student.findByPk(id)
    }

    async findBy(filter) {
        return Student.findAll({ where: filter })
    }

    async create(data) {
        return Student.create(data)
    }

    async update(id, data) {
        // Handle image removal if needed
        if (data.remove_images && data.remove_images.length > 0) {
            await utils.removeImages(data.remove_images)
        }

        // Clean up helper fields
        delete data.remove_images

        await Student.update(data, { where: { id: id } })
        return Student.findByPk(id)
    }

    async delete(id) {
        return Student.destroy({ where: { id: id } })
    }

    async deleteAll() {
        return Student.destroy({ where: {}, truncate: false })
    }
}

module.exports = StudentRepositoryMySQL
