const serialize = require('../serializer')

const User = require('@models/mongodb/schemas/user')
const UserLog = require('@models/mongodb/schemas/user-log')

const utils = require('@utils/index')
const { services } = require('@utils/config/constant')

const service = services.user

const popAndSerializeUsers = (query, service) =>
    query
        .populate({
            path: 'level_id',
            model: 'user_role',
            select: 'level',
        })
        .lean()
        .then((data) => serialize(data, service, true))

const listUsers = async (params) => {
    const filter = { ...params }

    if (filter.created_at) {
        filter.created_at = await utils.getDateRange(filter.created_at)
    }

    // Remove any non-field filters that might be passed in
    delete filter.n_filter

    return popAndSerializeUsers(User.find(filter), service)
}

const findUserById = (id) => {
    return User.findById(id)
        .lean()
        .then((data) => serialize(data, service))
}

const findUserLog = (params) => {
    return UserLog.find(params)
        .sort({ created_at: -1 })
        .limit(8)
        .lean()
        .then((data) => serialize(data, service))
}

const addUser = (dataObj) => {
    const user = new User(dataObj)
    return user.save().then((data) => serialize(data, service))
}

const createUser = (dataObj) => {
    // Simple user creation without linking to account/owner/staff
    return addUser(dataObj)
}

const removeUser = (dataObj) => {
    // Backwards-compatible helper: remove user by id without account unlinking
    if (!dataObj || !dataObj.id) {
        throw new Error('User id is required')
    }

    return User.findByIdAndDelete(dataObj.id)
        .lean()
        .then((data) => serialize(data, service))
}

const updateWithPass = (id, dataObj) => {
    return User.findOneAndUpdate({ _id: id }, dataObj, { new: true })
        .lean()
        .then((data) => serialize(data, service))
}

const updateWithoutPass = async (id, dataObj) => {
    return User.findByIdAndUpdate(id, dataObj, { new: true })
        .lean()
        .then((data) => serialize(data, service))
}

const deleteUser = async (id) => {
    return User.findByIdAndDelete(id)
        .lean()
        .then((data) => serialize(data, service))
}

module.exports = {
    listUsers,
    findUserById,
    findUserLog,
    addUser,
    createUser,
    removeUser,
    updateWithPass,
    updateWithoutPass,
    deleteUser,
}
