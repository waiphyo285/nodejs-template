const serialize = require('../serializer')
const Student = require('@models/mongodb/schemas/student')

const { getQueryParams } = require('@utils/schema')
const { getQueryPaging } = require('@utils/schema')

const listData = async (params) => {
    const { filter, w_regx, sort, skip, limit, draw } = await getQueryParams(
        params
    )

    const recordsTotal = await Student.countDocuments(filter)

    return Student.find(filter)
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
    return Student.findById(id).then(serialize)
}

const findDataBy = async (params) => {
    const { filter } = await getQueryPaging(params)

    return Student.find(filter).then(serialize)
}

const addData = (dataObj) => {
    return Student.create(dataObj).then(serialize)
}

const updateData = (id, dataObj) => {
    return Student.findByIdAndUpdate(id, dataObj).then(serialize)
}

const deleteData = (id) => {
    return Student.findByIdAndDelete(id).then(serialize)
}

const dropAll = () => {
    return Student.remove()
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
