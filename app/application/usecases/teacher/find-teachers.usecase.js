/**
 * Find Teachers Use Case
 */
class FindTeachersUseCase {
    constructor(teacherService) {
        this.teacherService = teacherService
    }

    async execute(request) {
        try {
            const teachers = await this.teacherService.findTeachers(request)
            return { success: true, data: teachers }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = FindTeachersUseCase
