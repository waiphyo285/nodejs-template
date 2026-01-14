const Joi = require('joi');

/**
 * Base Use Case
 * Provides a standardized way to execute business logic with consistent error handling and validation.
 */
class BaseUseCase {
    constructor() {
        this.schema = null;
    }

    /**
     * Executes the use case logic.
     * 
     * @param {Object} request - The request data
     * @returns {Promise<Object>} - Standardized response { success: boolean, data?: any, error?: string }
     */
    async execute(request) {
        try {
            const validatedRequest = await this.validate(request);
            const result = await this.handle(validatedRequest);

            return {
                success: true,
                data: result
            };
        } catch (error) {
            if (typeof iamlog !== 'undefined') {
                iamlog.error(`Use Case Error: ${this.constructor.name}`, error);
            } else {
                console.error(`Use Case Error: ${this.constructor.name}`, error);
            }

            return {
                success: false,
                error: error.isJoi ? error.details.map(d => d.message).join(', ') : (error.message || 'An unexpected error occurred'),
                isValidationError: !!error.isJoi
            };
        }
    }

    /**
     * Validates the request against the schema if defined.
     * @param {Object} request 
     * @returns {Promise<Object>} Validated data
     */
    async validate(request) {
        if (!this.schema) return request;

        const { error, value } = this.schema.validate(request, {
            abortEarly: false,
            stripUnknown: true,
            allowUnknown: true
        });

        if (error) {
            error.isJoi = true;
            throw error;
        }

        return value;
    }

    /**
     * Logic implementation for the specific use case.
     */
    async handle(request) {
        throw new Error('Method "handle()" must be implemented');
    }
}

module.exports = BaseUseCase;

