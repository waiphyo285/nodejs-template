const BaseRepository = require('./base.repository');

/**
 * User Repository Interface
 */
class UserRepository extends BaseRepository {
    async findLogs(params) {
        throw new Error('findLogs() must be implemented');
    }
}

module.exports = UserRepository;

