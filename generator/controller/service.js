const serialize = require('../serializer')
const Controller = require('@models/mongodb/schemas/generator')

const { getQueryParams } = require('@utils/schema')
const { getQueryPaging } = require('@utils/schema')

const listData = async (params) => {
    const { filter, w_regx, sort, skip, limit, draw } = await getQueryParams(
        params
    )

    const recordsTotal = await Controller.countDocuments(filter)

    return Controller.find(filter)
        .or({ $or: w_regx })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .then((data) => {
            return serialize({
                data,
                draw,
                recordsTotal,
                recordsFiltered: recordsTotal,
            })
        })
}

const findDataById = (id) => {
    return Controller.findById(id).then(serialize)
}

const findDataBy = async (params) => {
    const { filter } = await getQueryPaging(params)

    return Controller.find(filter).then(serialize)
}

const addData = (dataObj) => {
    return Controller.create(dataObj).then(serialize)
}

const updateData = (id, dataObj) => {
    return Controller.findByIdAndUpdate(id, dataObj).then(serialize)
}

const deleteData = (id) => {
    return Controller.findByIdAndDelete(id).then(serialize)
}

const dropAll = () => {
    return Controller.remove()
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
