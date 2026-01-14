const BaseUseCase = require('../base.usecase');

/**
 * Find Students Use Case
 */
class FindStudentsUseCase extends BaseUseCase {
    constructor(studentService) {
        super();
        this.studentService = studentService;
    }

    async handle(request) {
        return this.studentService.findStudents(request);
    }
}

module.exports = FindStudentsUseCase;

