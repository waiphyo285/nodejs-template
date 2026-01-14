const BaseUseCase = require('../base.usecase');
const teacherSchemas = require('@models/validations/teacher.validation');

/**
 * Update Teacher Use Case
 */
class UpdateTeacherUseCase extends BaseUseCase {
    constructor(teacherService) {
        super();
        this.teacherService = teacherService;
        this.schema = teacherSchemas.idWithData;
    }

    async handle(request) {
        return this.teacherService.updateTeacher(
            request.id,
            request.data
        );
    }
}

module.exports = UpdateTeacherUseCase;

