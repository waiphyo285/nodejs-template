const MongoDBRepository = require('./mongodb.repository');
const UserRoleModel = require('@models/mongodb/schemas/user-role.schema');

/**
 * User Role Repository (MongoDB Implementation)
 */
class RoleRepositoryMongoDB extends MongoDBRepository {
    constructor() {
        super(UserRoleModel, ['role', 'level']);
    }

    async findBy(query) {
        const { filter, sort } = await require('@utils/schema.util').getFilterQuery(query);
        return this.model.find(filter).sort(sort).lean();
    }

    async getConfig() {
        return this.model.find({}).lean();
    }
}

module.exports = RoleRepositoryMongoDB;
