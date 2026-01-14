const BaseUseCase = require('../base.usecase');
const teacherSchemas = require('@models/validations/teacher.validation');

/**
 * Create Teacher Use Case
 */
class CreateTeacherUseCase extends BaseUseCase {
    constructor(teacherService) {
        super();
        this.teacherService = teacherService;
        this.schema = teacherSchemas.create;
    }

    async handle(request) {
        return this.teacherService.createTeacher(request);
    }
}

module.exports = CreateTeacherUseCase;

