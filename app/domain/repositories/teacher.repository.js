const BaseRepository = require('./base.repository');

/**
 * Teacher Repository Interface
 */
class TeacherRepository extends BaseRepository {
    async findBy(filter) {
        throw new Error('findBy() must be implemented');
    }

    async deleteAll() {
        throw new Error('deleteAll() must be implemented');
    }
}

module.exports = TeacherRepository;

