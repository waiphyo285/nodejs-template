const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Delete Student Use Case
 */
class DeleteStudentUseCase extends BaseUseCase {
    constructor(studentService) {
        super();
        this.studentService = studentService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        await this.studentService.deleteStudent(request.id);
        return { message: 'Student deleted successfully' };
    }
}

module.exports = DeleteStudentUseCase;

