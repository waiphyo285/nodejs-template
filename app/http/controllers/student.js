const serialize = require('./_serializer')
const Database = require('@models/mysql/connection')
const utils = require('@utils/index')

const Student = Database.students
const Op = Database.Sequelize.Op

class StudentController {
    static async find(params) {
        const { search, limit = 10, offset = 0 } = params

        const condition = search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { grade: { [Op.like]: `%${search}%` } }
                ]
            }
            : {}

        return Student.findAndCountAll({
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
        return Student.findByPk(id).then(serialize)
    }

    static findBy(params) {
        const filter = { ...params }
        delete filter.limit
        delete filter.offset

        return Student.findAll({ where: filter }).then(serialize)
    }

    static async create(dataObj) {
        if (dataObj.images && Array.isArray(dataObj.images)) {
            dataObj.images = dataObj.images
        } else {
            dataObj.images = []
        }

        return Student.create(dataObj).then(serialize)
    }

    static async update(id, dataObj) {
        if (dataObj.remove_images && dataObj.remove_images.length > 0) {
            await utils.removeImages(dataObj.remove_images)
        }

        if (dataObj.images && Array.isArray(dataObj.images)) {
            dataObj.images = dataObj.images
        } else if (!dataObj.images) {
            dataObj.images = []
        }

        delete dataObj.remove_images

        return Student.update(dataObj, {
            where: { id: id },
            returning: true
        }).then(() => {
            return Student.findByPk(id).then(serialize)
        })
    }

    static drop(id) {
        return Student.destroy({ where: { id: id } }).then(() => {
            return serialize({ message: 'Student deleted successfully' })
        })
    }

    static dropAll() {
        return Student.destroy({ where: {}, truncate: false })
    }
}

module.exports = StudentController