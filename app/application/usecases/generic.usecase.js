const BaseUseCase = require('./base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Handles standard operations (findAll, findById, create, update, delete)
 */
class GenericUseCase extends BaseUseCase {
    /**
     * @param {Object} service - The domain service to use
     * @param {String} action - The action to perform (findAll, findById, create, update, delete)
     */
    constructor(service, action) {
        super();
        this.service = service;
        this.action = action;
        this.schema = this._getSchemaForAction(action);
    }

    /**
     * Internal method to determine validation schema based on action
     */
    _getSchemaForAction(action) {
        switch (action) {
            case 'findById':
            case 'delete':
                return commonSchemas.id;
            case 'update':
                return commonSchemas.idWithData;
            default:
                return null;
        }
    }

    async handle(request) {
        switch (this.action) {
            case 'findAll':
                return this.service.findAll(request);
            case 'findById':
                return this.service.findById(request.id);
            case 'create':
                return this.service.create(request.data || request);
            case 'update':
                return this.service.update(request.id, request.data);
            case 'delete':
                return this.service.delete(request.id);
            default:
                if (typeof this.service[this.action] === 'function') {
                    return this.service[this.action](request);
                }
                throw new Error(`Action "${this.action}" is not supported by the service`);
        }
    }
}

module.exports = GenericUseCase;

