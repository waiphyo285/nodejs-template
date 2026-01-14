const BaseUseCase = require('../base.usecase');
const studentSchemas = require('@models/validations/student.validation');

/**
 * Update Student Use Case
 */
class UpdateStudentUseCase extends BaseUseCase {
    constructor(studentService) {
        super();
        this.studentService = studentService;
        this.schema = studentSchemas.idWithData;
    }

    async handle(request) {
        return this.studentService.updateStudent(
            request.id,
            request.data
        );
    }
}

module.exports = UpdateStudentUseCase;

