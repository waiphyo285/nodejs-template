/**
 * Get Teacher By ID Use Case
 */
class GetTeacherByIdUseCase {
    constructor(teacherService) {
        this.teacherService = teacherService
    }

    async execute(request) {
        try {
            const teacher = await this.teacherService.getTeacherById(request.id)
            return { success: true, data: teacher }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetTeacherByIdUseCase
