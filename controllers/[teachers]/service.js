const serialize = require('../serializer')
const Database = require('@models/mysqldb/connection')

const { getQueryParams } = require('@utils/schema')
const { getQueryPaging } = require('@utils/schema')

const Teacher = Database.teachers
const Op = Database.Sequelize.Op

const listData = async (params) => {
    const {
        skip: offset,
        limit,
        draw,
    } = await getQueryParams(params, ['name'], false)

    const condition = params.search.value
        ? { name: { [Op.like]: `%${params.search.value}%` } }
        : null

    return Teacher.findAndCountAll({ where: condition, limit, offset }).then(
        (data) => {
            return serialize({
                draw,
                data: data.rows,
                recordsTotal: data.count,
                recordsFiltered: data.count,
            })
        }
    )
}

const findDataById = (id) => {
    return Teacher.findByPk(id).then(serialize)
}

const findDataBy = async (params) => {
    const { filter } = await getQueryPaging(params)

    return Teacher.findAll({ where: filter }).then(serialize)
}

const addData = (dataObj) => {
    return Teacher.create(dataObj).then(serialize)
}

const updateData = (id, dataObj) => {
    return Teacher.update(dataObj, { where: { id: id } }).then(serialize)
}

const deleteData = (id) => {
    return Teacher.destroy({ where: { id: id } }).then(serialize)
}

const dropAll = () => {
    return Teacher.destroy({ where: {}, truncate: false })
}

module.exports = {
    listData,
    findDataById,
    findDataBy,
    addData,
    updateData,
    deleteData,
    dropAll,
}
