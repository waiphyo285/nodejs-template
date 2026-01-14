const BaseUseCase = require('../base.usecase');
const studentSchemas = require('@models/validations/student.validation');

/**
 * Create Student Use Case
 */
class CreateStudentUseCase extends BaseUseCase {
    constructor(studentService) {
        super();
        this.studentService = studentService;
        this.schema = studentSchemas.create;
    }

    async handle(request) {
        return this.studentService.createStudent(request);
    }
}

module.exports = CreateStudentUseCase;

