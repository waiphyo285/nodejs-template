/**
 * Update Student Use Case
 */
class UpdateStudentUseCase {
    constructor(studentService) {
        this.studentService = studentService
    }

    async execute(request) {
        try {
            const student = await this.studentService.updateStudent(
                request.id,
                request.data
            )
            return { success: true, data: student }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = UpdateStudentUseCase
