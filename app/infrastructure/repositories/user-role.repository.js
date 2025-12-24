const UserRoleRepository = require('@domain/repositories/user-role.repository')
const UserRoleModel = require('@models/mongodb/schemas/user-role.schema')
const schema = require('@utils/schema.util')

class UserRoleRepositoryMongoDB extends UserRoleRepository {
    async find(query = {}) {
        const { filter, w_regx, sort, skip, limit, draw } =
            await schema.getPagingQuery(query, ['role', 'level'])

        const recordsTotal = await UserRoleModel.countDocuments(filter)

        return UserRoleModel.find(filter)
            .or({ $or: w_regx })
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
        return UserRoleModel.findById(id).lean()
    }

    async findBy(query) {
        const { filter } = await schema.getFilterQuery(query)
        return UserRoleModel.find(filter)
            .populate({
                path: 'level_id',
                model: 'user_role',
                select: 'level',
            })
            .sort(sort)
            .lean()
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
