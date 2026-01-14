const BaseUseCase = require('../base.usecase');

/**
 * Find Teachers Use Case
 */
class FindTeachersUseCase extends BaseUseCase {
    constructor(teacherService) {
        super();
        this.teacherService = teacherService;
    }

    async handle(request) {
        return this.teacherService.findTeachers(request);
    }
}

module.exports = FindTeachersUseCase;

