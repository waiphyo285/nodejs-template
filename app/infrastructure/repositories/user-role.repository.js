const UserRoleRepository = require('@domain/repositories/user-role.repository')
const UserRoleModel = require('@models/mongodb/schemas/user-role.schema')

class UserRoleRepositoryMongoDB extends UserRoleRepository {
    async find(filter) {
        return UserRoleModel.find(filter).lean()
    }

    async findById(id) {
        return UserRoleModel.findById(id).lean()
    }

    async findBy(filter) {
        return UserRoleModel.find(filter).lean()
    }

    async create(data) {
        const role = new UserRoleModel(data)
        return role.save()
    }

    async update(id, data) {
        return UserRoleModel.findOneAndUpdate({ _id: id }, data, {
            new: true,
        }).lean()
    }

    async delete(id) {
        return UserRoleModel.findByIdAndDelete(id).lean()
    }

    async getConfig() {
        return UserRoleModel.find({}).lean()
    }
}

module.exports = UserRoleRepositoryMongoDB
