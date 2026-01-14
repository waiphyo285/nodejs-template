/**
 * Base Repository Interface (Domain Layer)
 * This defines the contract for all repositories in the system.
 */
class BaseRepository {
    /**
     * Find many records matching the filter/query.
     * @param {Object} query - Paging, sorting, and filter parameters
     * @returns {Promise<{ data: Array, recordsTotal: number, recordsFiltered: number }>}
     */
    async find(query) {
        throw new Error('Method "find()" must be implemented');
    }

    /**
     * Find a single record by its unique identifier.
     * @param {string|number} id - Unique identifier
     * @returns {Promise<Object|null>} The record or null if not found
     */
    async findById(id) {
        throw new Error('Method "findById()" must be implemented');
    }

    /**
     * Create a new record.
     * @param {Object} data - The data to create
     * @returns {Promise<Object>} The created record
     */
    async create(data) {
        throw new Error('Method "create()" must be implemented');
    }

    /**
     * Update an existing record.
     * @param {string|number} id - Unique identifier
     * @param {Object} data - The data to update
     * @returns {Promise<Object>} The updated record
     */
    async update(id, data) {
        throw new Error('Method "update()" must be implemented');
    }

    /**
     * Delete a record by ID.
     * @param {string|number} id - Unique identifier
     * @returns {Promise<boolean>} True if deleted, false otherwise
     */
    async delete(id) {
        throw new Error('Method "delete()" must be implemented');
    }
}

module.exports = BaseRepository;
