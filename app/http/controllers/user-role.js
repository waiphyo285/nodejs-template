const async = require('async')
const serialize = require('./_serializer')
const UserRoleModel = require('@models/mongodb/schemas/user-role')

const utils = require('@utils/index')
const { checkReference, getQueryPaging } = require('@utils/schema')

class UserRoleController {
    static async find(params) {
        const filter = {}

        if (params.created_at) {
            filter['created_at'] = await utils.getDateRange(params.created_at)
        }

        return UserRoleModel.find(filter).then(serialize)
    }

    static findById(id) {
        return UserRoleModel.findById(id).lean().then(serialize)
    }

    static async findBy(params) {
        const { filter } = await getQueryPaging(params)

        return UserRoleModel.find(filter).then(serialize)
    }

    static create(dataObj) {
        return UserRoleModel.create(dataObj).then(serialize)
    }

    static update(id, dataObj) {
        return UserRoleModel.findByIdAndUpdate(id, dataObj).then(serialize)
    }

    static async drop(id) {
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

        return UserRoleModel.findByIdAndDelete(id).then(serialize)
    }

    static dropAll() {
        return UserRoleModel.deleteMany({})
    }
}

module.exports = UserRoleController
