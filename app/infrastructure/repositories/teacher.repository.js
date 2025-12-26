const TeacherRepository = require('@domain/repositories/teacher.repository')
const Database = require('@models/mysql/connection')
const schema = require('@utils/schema.util')

const Teacher = Database.teachers
const Op = Database.Sequelize.Op

class TeacherRepositoryMySQL extends TeacherRepository {
    async find(query = {}) {
        const {
            sort,
            filter,
            skip: offset,
            limit,
            draw,
        } = await schema.getPagingQuery(query, ['name', 'degree'])

        const condition = filter.search
            ? {
                  [Op.or]: [
                      { name: { [Op.like]: `%${filter.search}%` } },
                      { grade: { [Op.like]: `%${filter.search}%` } },
                  ],
              }
            : {}

        const result = await Teacher.findAndCountAll({
            where: condition,
            limit: parseInt(limit),
            offset: parseInt(offset),
            // order: Object.entries(sort).map(([key, value]) => [key, value === 1 ? 'ASC' : 'DESC']),
        })

        return {
            data: result.rows,
            draw,
            recordsTotal: result.count,
            recordsFiltered: result.count,
        }
    }

    async findById(id) {
        return Teacher.findByPk(id)
    }

    async findBy(query = {}) {
        const { filter, sort } = await schema.getFilterQuery(query)

        return Teacher.findAll({
            where: filter,
            // order: Object.entries(sort).map(([key, value]) => [key, value === 1 ? 'ASC' : 'DESC']),
        })
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
