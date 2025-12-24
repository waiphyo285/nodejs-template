/**
 * Create Student Use Case
 */
class CreateStudentUseCase {
    constructor(studentService) {
        this.studentService = studentService
    }

    async execute(request) {
        try {
            const student = await this.studentService.createStudent(request)
            return { success: true, data: student }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateStudentUseCase
