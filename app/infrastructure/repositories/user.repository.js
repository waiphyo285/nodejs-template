const UserRepository = require('@domain/repositories/user.repository')
const UserModel = require('@models/mongodb/schemas/user.schema')
const UserLogModel = require('@models/mongodb/schemas/user-log.schema')
const schema = require('@utils/schema.util')

class UserRepositoryMongoDB extends UserRepository {
    async find(query = {}) {
        const { filter, w_regx, sort, skip, limit, draw } =
            await schema.getPagingQuery(query, ['username'])

        const recordsTotal = await UserModel.countDocuments(filter)

        return UserModel.find(filter)
            .or({ $or: w_regx })
            .populate({
                path: 'level_id',
                model: 'user_role',
                select: 'level',
            })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .then((data) => {
                return {
                    data,
                    draw,
                    recordsTotal,
                    recordsFiltered: recordsTotal,
                }
            })
    }

    async findById(id) {
        return UserModel.findById(id).lean()
    }

    async findBy(query) {
        const { filter, sort } = await schema.getFilterQuery(query)
        return UserModel.find(filter)
            .populate({
                path: 'level_id',
                model: 'user_role',
                select: 'level',
            })
            .sort(sort)
            .lean()
    }

    async findLogs(params) {
        return UserLogModel.find(params)
            .sort({ created_at: -1 })
            .limit(8)
            .lean()
    }

    async create(data) {
        const user = new UserModel(data)
        return user.save()
    }

    async update(id, data) {
        return UserModel.findOneAndUpdate({ _id: id }, data, {
            new: true,
        }).lean()
    }

    async delete(id) {
        return UserModel.findByIdAndDelete(id).lean()
    }
}

module.exports = UserRepositoryMongoDB
