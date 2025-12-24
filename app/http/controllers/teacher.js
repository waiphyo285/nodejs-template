const serialize = require('./_serializer')
const Database = require('@models/mysql/connection')

const Teacher = Database.teachers
const Op = Database.Sequelize.Op

class TeacherController {
    static async find(params) {
        const { search, limit = 10, offset = 0 } = params

        const condition = search
            ? { name: { [Op.like]: `%${search}%` } }
            : {}

        return Teacher.findAndCountAll({
            where: condition,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        }).then((result) => {
            return serialize({
                data: result.rows,
                total: result.count,
                limit: parseInt(limit),
                offset: parseInt(offset)
            })
        })
    }

    static findById(id) {
        return Teacher.findByPk(id).then(serialize)
    }

    static findBy(params) {
        const filter = { ...params }
        delete filter.limit
        delete filter.offset

        return Teacher.findAll({ where: filter }).then(serialize)
    }

    static create(dataObj) {
        return Teacher.create(dataObj).then(serialize)
    }

    static update(id, dataObj) {
        return Teacher.update(dataObj, {
            where: { id: id },
            returning: true
        }).then(() => {
            return Teacher.findByPk(id).then(serialize)
        })
    }

    static drop(id) {
        return Teacher.destroy({ where: { id: id } }).then(() => {
            return serialize({ message: 'Teacher deleted successfully' })
        })
    }

    static dropAll() {
        return Teacher.destroy({ where: {}, truncate: false })
    }
}

module.exports = TeacherController