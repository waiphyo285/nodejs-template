const BaseRepository = require('./base.repository');

/**
 * Role Repository Interface
 */
class RoleRepository extends BaseRepository {
    async findBy(filter) {
        throw new Error('findBy() must be implemented');
    }

    async getConfig() {
        throw new Error('getConfig() must be implemented');
    }
}

module.exports = RoleRepository;

