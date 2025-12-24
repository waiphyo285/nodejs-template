/**
 * Create Teacher Use Case
 */
class CreateTeacherUseCase {
    constructor(teacherService) {
        this.teacherService = teacherService
    }

    async execute(request) {
        try {
            const teacher = await this.teacherService.createTeacher(request)
            return { success: true, data: teacher }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateTeacherUseCase
