/**
 * Get Student By ID Use Case
 */
class GetStudentByIdUseCase {
    constructor(studentService) {
        this.studentService = studentService
    }

    async execute(request) {
        try {
            const student = await this.studentService.getStudentById(request.id)
            return { success: true, data: student }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetStudentByIdUseCase
