/**
 * Delete Student Use Case
 */
class DeleteStudentUseCase {
    constructor(studentService) {
        this.studentService = studentService
    }

    async execute(request) {
        try {
            await this.studentService.deleteStudent(request.id)
            return { success: true, message: 'Student deleted successfully' }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = DeleteStudentUseCase
