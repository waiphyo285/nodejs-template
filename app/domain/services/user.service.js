const BaseService = require('./base.service');
const utils = require('@utils/index');

/**
 * User Service
 */
class UserService extends BaseService {
    constructor(userRepository) {
        super(userRepository);
    }

    async onBeforeFind(params) {
        const filter = { ...params };
        if (filter.created_at) {
            filter.created_at = await utils.getDateRange(filter.created_at);
        }
        delete filter.n_filter;
        delete filter.tz_filter;
        return filter;
    }

    async onBeforeCreate(data) {
        return data;
    }

    async getUserLogs(params) {
        return this.repository.findLogs(params);
    }

    async updateUserWithPassword(id, data) {
        return this.update(id, data);
    }

    async updateUserWithoutPassword(id, data) {
        return this.update(id, data);
    }

    // Aliases
    async findUsers(params) { return this.findAll(params); }
    async getUserById(id) { return this.findById(id); }
    async createUser(data) { return this.create(data); }
    async deleteUser(id) { return this.delete(id); }
}

module.exports = UserService;
