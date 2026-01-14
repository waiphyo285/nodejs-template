const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Get Student By ID Use Case
 */
class GetStudentByIdUseCase extends BaseUseCase {
    constructor(studentService) {
        super();
        this.studentService = studentService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        return this.studentService.getStudentById(request.id);
    }
}

module.exports = GetStudentByIdUseCase;

