const UserRepository = require('@domain/repositories/user.repository')
const UserModel = require('@models/mongodb/schemas/user.schema')
const UserLogModel = require('@models/mongodb/schemas/user-log.schema')


class UserRepositoryMongoDB extends UserRepository {
    async find(filter) {
        return UserModel.find(filter)
            .populate({
                path: 'level_id',
                model: 'user_role',
                select: 'level',
            })
            .lean()
    }

    async findById(id) {
        return UserModel.findById(id).lean()
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
        return UserModel.findOneAndUpdate({ _id: id }, data, { new: true })
            .lean()
    }

    async delete(id) {
        return UserModel.findByIdAndDelete(id).lean()
    }
}

module.exports = UserRepositoryMongoDB
