class UserRoleRepository {
    async find(filter) {
        throw new Error('find() must be implemented')
    }

    async findById(id) {
        throw new Error('findById() must be implemented')
    }

    async findBy(filter) {
        throw new Error('findBy() must be implemented')
    }

    async create(data) {
        throw new Error('create() must be implemented')
    }

    async update(id, data) {
        throw new Error('update() must be implemented')
    }

    async delete(id) {
        throw new Error('delete() must be implemented')
    }

    async getConfig() {
        throw new Error('getConfig() must be implemented')
    }
}

module.exports = UserRoleRepository
