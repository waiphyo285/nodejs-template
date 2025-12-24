const serialize = require('./_serializer')

const UserModel = require('@models/mongodb/schemas/user')
const UserLogModel = require('@models/mongodb/schemas/user-log')

const utils = require('@utils/index')

const poprializeUsers = (query) =>
    query
        .populate({
            path: 'level_id',
            model: 'user_role',
            select: 'level',
        })
        .lean()
        .then(serialize)

class UserController {
    static async find(params) {
        const filter = { ...params }

        if (filter.created_at) {
            filter.created_at = await utils.getDateRange(filter.created_at)
        }

        delete filter.n_filter
        delete filter.tz_filter

        return poprializeUsers(UserModel.find(filter))
    }

    static findById(id) {
        return UserModel.findById(id).lean().then(serialize)
    }

    static findLogs(params) {
        return UserLogModel.find(params)
            .sort({ created_at: -1 })
            .limit(8)
            .lean()
            .then(serialize)
    }

    static create(dataObj) {
        const user = new UserModel(dataObj)
        return user.save().then(serialize)
    }

    static remove(dataObj) {
        if (!dataObj || !dataObj.id) {
            throw new Error('UserModel id is required')
        }

        return UserModel.findByIdAndDelete(dataObj.id).lean().then(serialize)
    }

    static updateWithPass(id, dataObj) {
        return UserModel.findOneAndUpdate({ _id: id }, dataObj, { new: true })
            .lean()
            .then(serialize)
    }

    static async updateWithoutPass(id, dataObj) {
        return UserModel.findByIdAndUpdate(id, dataObj, { new: true })
            .lean()
            .then(serialize)
    }

    static async drop(id) {
        return UserModel.findByIdAndDelete(id).lean().then(serialize)
    }
}

module.exports = UserController
