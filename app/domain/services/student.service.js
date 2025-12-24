/**
 * Student Domain Service
 * Contains business logic for student operations
 */
class StudentService {
    constructor(studentRepository) {
        this.studentRepository = studentRepository
    }

    /**
     * Find students with search and pagination
     */
    async findStudents(params) {
        const { search, limit = 10, offset = 0 } = params

        const filter = { search }
        const pagination = { limit, offset }

        return this.studentRepository.find(filter, pagination)
    }

    /**
     * Get student by ID
     */
    async getStudentById(id) {
        if (!id) {
            throw new Error('Student ID is required')
        }
        return this.studentRepository.findById(id)
    }

    /**
     * Find students by criteria
     */
    async findStudentsBy(criteria) {
        if (!criteria || Object.keys(criteria).length === 0) {
            throw new Error('Search criteria is required')
        }
        return this.studentRepository.findBy(criteria)
    }

    /**
     * Create new student
     */
    async createStudent(data) {
        if (!data || !data.name) {
            throw new Error('Student name is required')
        }

        // Validate age if provided
        if (data.age && (data.age < 16 || data.age > 30)) {
            throw new Error('Student age must be between 16 and 30')
        }

        // Validate grade if provided
        if (data.grade && (data.grade < 0 || data.grade > 100)) {
            throw new Error('Student grade must be between 0 and 100')
        }

        // Ensure images is an array
        if (!data.images) {
            data.images = []
        }

        return this.studentRepository.create(data)
    }

    /**
     * Update student
     */
    async updateStudent(id, data) {
        if (!id) {
            throw new Error('Student ID is required')
        }

        if (!data || !data.name) {
            throw new Error('Student name is required')
        }

        // Ensure images is an array
        if (!data.images) {
            data.images = []
        }

        return this.studentRepository.update(id, data)
    }

    /**
     * Delete student
     */
    async deleteStudent(id) {
        if (!id) {
            throw new Error('Student ID is required')
        }
        return this.studentRepository.delete(id)
    }

    /**
     * Delete all students (admin only)
     */
    async deleteAllStudents() {
        return this.studentRepository.deleteAll()
    }
}

module.exports = StudentService
