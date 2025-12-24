/**
 * Update Teacher Use Case
 */
class UpdateTeacherUseCase {
    constructor(teacherService) {
        this.teacherService = teacherService
    }

    async execute(request) {
        try {
            const teacher = await this.teacherService.updateTeacher(
                request.id,
                request.data
            )
            return { success: true, data: teacher }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = UpdateTeacherUseCase
