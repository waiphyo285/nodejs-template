const utils = require('@utils/index')

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    /**
     * Find users with filtering and date range support
     */
    async findUsers(params) {
        const filter = { ...params }

        // Apply date range filter if provided
        if (filter.created_at) {
            filter.created_at = await utils.getDateRange(filter.created_at)
        }

        // Remove UI-specific filters
        delete filter.n_filter
        delete filter.tz_filter

        return this.userRepository.find(filter)
    }

    /**
     * Get user by ID
     */
    async getUserById(id) {
        if (!id) {
            throw new Error('User ID is required')
        }
        return this.userRepository.findById(id)
    }

    /**
     * Get user activity logs
     */
    async getUserLogs(params) {
        return this.userRepository.findLogs(params)
    }

    /**
     * Create new user
     */
    async createUser(data) {
        if (!data || !data.username || !data.password) {
            throw new Error('Username and password are required')
        }
        return this.userRepository.create(data)
    }

    /**
     * Update user with password
     */
    async updateUserWithPassword(id, data) {
        if (!id) {
            throw new Error('User ID is required')
        }
        return this.userRepository.update(id, data)
    }

    /**
     * Update user without password
     */
    async updateUserWithoutPassword(id, data) {
        if (!id) {
            throw new Error('User ID is required')
        }
        return this.userRepository.update(id, data)
    }

    /**
     * Delete user
     */
    async deleteUser(id) {
        if (!id) {
            throw new Error('User ID is required')
        }
        return this.userRepository.delete(id)
    }
}

module.exports = UserService
