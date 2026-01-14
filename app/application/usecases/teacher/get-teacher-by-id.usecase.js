const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Get Teacher By ID Use Case
 */
class GetTeacherByIdUseCase extends BaseUseCase {
    constructor(teacherService) {
        super();
        this.teacherService = teacherService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        return this.teacherService.getTeacherById(request.id);
    }
}

module.exports = GetTeacherByIdUseCase;

