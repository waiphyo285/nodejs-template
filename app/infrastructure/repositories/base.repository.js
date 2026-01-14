const DomainBaseRepository = require('../../domain/repositories/base.repository');

/**
 * Infrastructure Base Repository
 * Concrete implementations (MySQL, MongoDB) should extend this.
 * It implements the Domain layer's BaseRepository contract.
 */
class BaseRepository extends DomainBaseRepository {
    /** @override */
    async find(query) {
        throw new Error('Method "find()" must be implemented by infrastructure');
    }

    /** @override */
    async findById(id) {
        throw new Error('Method "findById()" must be implemented by infrastructure');
    }

    /** @override */
    async create(data) {
        throw new Error('Method "create()" must be implemented by infrastructure');
    }

    /** @override */
    async update(id, data) {
        throw new Error('Method "update()" must be implemented by infrastructure');
    }

    /** @override */
    async delete(id) {
        throw new Error('Method "delete()" must be implemented by infrastructure');
    }
}

module.exports = BaseRepository;

