const MongoDBRepository = require('./mongodb.repository');
const UserModel = require('@models/mongodb/schemas/user.schema');
const UserLogModel = require('@models/mongodb/schemas/user-log.schema');
const schema = require('@utils/schema.util');

/**
 * User Repository (MongoDB Implementation)
 */
class UserRepositoryMongoDB extends MongoDBRepository {
    constructor() {
        super(UserModel, ['username']);
    }


    async find(query = {}) {
        const { filter, w_regx, sort, skip, limit, draw } =
            await schema.getPagingQuery(query, this.searchFields);

        const recordsTotal = await this.model.countDocuments(filter);

        const data = await this.model.find(filter)
            .or({ $or: w_regx })
            .populate({
                path: 'level_id',
                model: 'user_role',
                select: 'level',
            })
            .sort(sort)
            .skip(skip)
            .limit(limit);

        return {
            data,
            draw,
            recordsTotal,
            recordsFiltered: recordsTotal,
        };
    }

    async findBy(query) {
        const { filter, sort } = await schema.getFilterQuery(query);
        return this.model.find(filter)
            .populate({
                path: 'level_id',
                model: 'user_role',
                select: 'level',
            })
            .sort(sort)
            .lean();
    }

    async findLogs(params) {
        return UserLogModel.find(params)
            .sort({ created_at: -1 })
            .limit(8)
            .lean();
    }
}

module.exports = UserRepositoryMongoDB;
