const TeacherRepository = require('@domain/repositories/teacher.repository')
const Database = require('@models/mysql/connection')

const Teacher = Database.teachers
const Op = Database.Sequelize.Op

class TeacherRepositoryMySQL extends TeacherRepository {
    async find(filter, pagination = {}) {
        const { limit = 10, offset = 0 } = pagination

        const condition = filter.search
            ? { name: { [Op.like]: `%${filter.search}%` } }
            : {}

        const result = await Teacher.findAndCountAll({
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
        return Teacher.findByPk(id)
    }

    async findBy(filter) {
        return Teacher.findAll({ where: filter })
    }

    async create(data) {
        return Teacher.create(data)
    }

    async update(id, data) {
        await Teacher.update(data, { where: { id: id } })
        return Teacher.findByPk(id)
    }

    async delete(id) {
        return Teacher.destroy({ where: { id: id } })
    }

    async deleteAll() {
        return Teacher.destroy({ where: {}, truncate: false })
    }
}

module.exports = TeacherRepositoryMySQL
