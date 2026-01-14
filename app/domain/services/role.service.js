const BaseService = require('./base.service');

/**
 * User Role Service
 */
class RoleService extends BaseService {
    constructor(roleRepository) {
        super(roleRepository);
    }

    async onBeforeCreate(data) {
        if (!data || !data.level) throw new Error('Role level is required');
        if (!data.role) throw new Error('Role name is required');
        return data;
    }

    async onBeforeUpdate(data, id) {
        return data;
    }

    // Custom methods
    async getRoleConfig() {
        return this.repository.getConfig();
    }

    async findByCriteria(criteria) {
        return this.repository.findBy(criteria);
    }

    // Aliases
    async findRoles(params) { return this.findAll(params); }
    async getRoleById(id) { return this.findById(id); }
    async createRole(data) { return this.create(data); }
    async updateRole(id, data) { return this.update(id, data); }
    async deleteRole(id) { return this.delete(id); }
}

module.exports = RoleService;
