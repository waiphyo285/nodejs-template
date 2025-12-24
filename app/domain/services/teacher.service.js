class TeacherService {
    constructor(teacherRepository) {
        this.teacherRepository = teacherRepository
    }

    /**
     * Find teachers with search and pagination
     */
    async findTeachers(params) {
        const { search, limit = 10, offset = 0 } = params

        const filter = { search }
        const pagination = { limit, offset }

        return this.teacherRepository.find(filter, pagination)
    }

    /**
     * Get teacher by ID
     */
    async getTeacherById(id) {
        if (!id) {
            throw new Error('Teacher ID is required')
        }
        return this.teacherRepository.findById(id)
    }

    /**
     * Find teachers by criteria
     */
    async findTeachersBy(criteria) {
        if (!criteria || Object.keys(criteria).length === 0) {
            throw new Error('Search criteria is required')
        }
        return this.teacherRepository.findBy(criteria)
    }

    /**
     * Create new teacher
     */
    async createTeacher(data) {
        if (!data || !data.name) {
            throw new Error('Teacher name is required')
        }

        // Validate age if provided
        if (data.age && (data.age < 18 || data.age > 100)) {
            throw new Error('Teacher age must be between 18 and 100')
        }

        return this.teacherRepository.create(data)
    }

    /**
     * Update teacher
     */
    async updateTeacher(id, data) {
        if (!id) {
            throw new Error('Teacher ID is required')
        }

        if (!data || !data.name) {
            throw new Error('Teacher name is required')
        }

        return this.teacherRepository.update(id, data)
    }

    /**
     * Delete teacher
     */
    async deleteTeacher(id) {
        if (!id) {
            throw new Error('Teacher ID is required')
        }
        return this.teacherRepository.delete(id)
    }

    /**
     * Delete all teachers (admin only)
     */
    async deleteAllTeachers() {
        return this.teacherRepository.deleteAll()
    }
}

module.exports = TeacherService
