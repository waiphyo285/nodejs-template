class UserRoleService {
    constructor(userRoleRepository) {
        this.userRoleRepository = userRoleRepository
    }

    /**
     * Find user roles with filtering
     */
    async findRoles(filter) {
        return this.userRoleRepository.find(filter)
    }

    /**
     * Get user role by ID
     */
    async getRoleById(id) {
        if (!id) {
            throw new Error('Role ID is required')
        }
        return this.userRoleRepository.findById(id)
    }

    /**
     * Find roles by criteria
     */
    async findRolesBy(criteria) {
        if (!criteria || Object.keys(criteria).length === 0) {
            throw new Error('Search criteria is required')
        }
        return this.userRoleRepository.findBy(criteria)
    }

    /**
     * Create new user role
     */
    async createRole(data) {
        if (!data || !data.level) {
            throw new Error('Role level is required')
        }

        if (!data.role) {
            throw new Error('Role name is required')
        }

        return this.userRoleRepository.create(data)
    }

    /**
     * Update user role
     */
    async updateRole(id, data) {
        if (!id) {
            throw new Error('Role ID is required')
        }

        if (!data || !data.level) {
            throw new Error('Role level is required')
        }

        return this.userRoleRepository.update(id, data)
    }

    /**
     * Delete user role
     */
    async deleteRole(id) {
        if (!id) {
            throw new Error('Role ID is required')
        }
        return this.userRoleRepository.delete(id)
    }

    /**
     * Get role configuration
     */
    async getRoleConfig() {
        return this.userRoleRepository.getConfig()
    }
}

module.exports = UserRoleService
