const BaseUseCase = require('../base.usecase');
const commonSchemas = require('@models/validations/common.validation');

/**
 * Delete Teacher Use Case
 */
class DeleteTeacherUseCase extends BaseUseCase {
    constructor(teacherService) {
        super();
        this.teacherService = teacherService;
        this.schema = commonSchemas.id;
    }

    async handle(request) {
        await this.teacherService.deleteTeacher(request.id);
        return { message: 'Teacher deleted successfully' };
    }
}

module.exports = DeleteTeacherUseCase;
