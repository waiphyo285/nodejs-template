/**
 * Teacher Repository Interface
 * Defines the contract for teacher data access operations
 */
class TeacherRepository {
    async find(filter, pagination) {
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

    async deleteAll() {
        throw new Error('deleteAll() must be implemented')
    }
}

module.exports = TeacherRepository
