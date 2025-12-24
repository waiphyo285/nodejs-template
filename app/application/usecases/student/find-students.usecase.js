/**
 * Find Students Use Case
 */
class FindStudentsUseCase {
    constructor(studentService) {
        this.studentService = studentService
    }

    async execute(request) {
        try {
            const students = await this.studentService.findStudents(request)
            return { success: true, data: students }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = FindStudentsUseCase
