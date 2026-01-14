const BaseRepository = require('./base.repository');

/**
 * Student Repository Interface
 */
class StudentRepository extends BaseRepository {
    async findBy(filter) {
        throw new Error('findBy() must be implemented');
    }

    async deleteAll() {
        throw new Error('deleteAll() must be implemented');
    }
}

module.exports = StudentRepository;

