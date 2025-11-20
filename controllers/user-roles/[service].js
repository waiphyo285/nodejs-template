const async = require('async')
const serialize = require('../serializer')
const UserRole = require('@models/mongodb/schemas/user-role')
const { clearKey } = require('@models/cache/services/index')

const utils = require('@utils/index')
const { checkReference } = require('@utils/schema')
const { getQueryPaging } = require('@utils/schema')

const collectionName = UserRole.collection.collectionName

const listData = async (params) => {
    const filter = {}

    if (params.created_at) {
        filter['created_at'] = await utils.getDateRange(params.created_at)
    }

    return UserRole.find(filter).cache().then(serialize)
}

const findDataById = (id) => {
    return UserRole.findById(id)
        .lean()
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const findDataBy = async (params) => {
    const { filter } = await getQueryPaging(params)

    return UserRole.find(filter)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const addData = (dataObj) => {
    return UserRole.create(dataObj)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const updateData = (id, dataObj) => {
    return UserRole.findByIdAndUpdate(id, dataObj)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const deleteData = async (id) => {
    const results = await async.parallel(
        await checkReference([
            {
                name: 'user',
                key: 'level_id',
                value: id,
            },
        ])
    )

    if (results && results.reduce((acc, current) => acc + current, 0) > 0) {
        return new Promise((resolve) => {
            resolve({ http_code: 405 })
        })
    }

    return UserRole.findByIdAndDelete(id)
        .then((resp) => {
            clearKey(collectionName)
            return resp
        })
        .then(serialize)
}

const dropAll = () => {
    return UserRole.remove()
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
