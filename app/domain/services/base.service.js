/**
 * Base Domestic Service
 * Standardizes operations and provides extensible lifecycle hooks.
 */
class BaseService {
    constructor(repository) {
        if (!repository) {
            throw new Error('Repository is required for BaseService');
        }
        this.repository = repository;
    }

    async findAll(params) {
        const modifiedParams = await this.onBeforeFind(params);
        const result = await this.repository.find(modifiedParams || params);
        return await this.onAfterFind(result);
    }

    async findById(id) {
        if (!id) throw new Error('ID is required');
        const result = await this.repository.findById(id);
        if (!result) throw new Error('Resource not found');
        return result;
    }

    async create(data) {
        const preparedData = await this.onBeforeCreate(data);
        const result = await this.repository.create(preparedData || data);
        return await this.onAfterCreate(result);
    }

    async update(id, data) {
        if (!id) throw new Error('ID is required for update');
        const preparedData = await this.onBeforeUpdate(data, id);
        const result = await this.repository.update(id, preparedData || data);
        return await this.onAfterUpdate(result);
    }

    async delete(id) {
        if (!id) throw new Error('ID is required for delete');
        const result = await this.repository.delete(id);
        await this.onAfterDelete(id);
        return result;
    }

    // -------------------------------------------------------------------------
    // Lifecycle Hooks (To be overridden by developers)
    // -------------------------------------------------------------------------

    async onBeforeFind(params) { return params; }
    async onAfterFind(result) { return result; }

    async onBeforeCreate(data) { return data; }
    async onAfterCreate(result) { return result; }

    async onBeforeUpdate(data, id) { return data; }
    async onAfterUpdate(result) { return result; }

    async onAfterDelete(id) { }
}

module.exports = BaseService;
