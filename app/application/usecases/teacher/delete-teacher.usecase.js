/**
 * Delete Teacher Use Case
 */
class DeleteTeacherUseCase {
    constructor(teacherService) {
        this.teacherService = teacherService
    }

    async execute(request) {
        try {
            await this.teacherService.deleteTeacher(request.id)
            return { success: true, message: 'Teacher deleted successfully' }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = DeleteTeacherUseCase
