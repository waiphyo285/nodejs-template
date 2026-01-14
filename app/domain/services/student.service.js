const BaseService = require('./base.service');

/**
 * Student Service
 */
class StudentService extends BaseService {
    constructor(studentRepository) {
        super(studentRepository);
    }

    async onBeforeCreate(data) {
        return {
            ...data,
            images: data.images || []
        };
    }

    async onBeforeUpdate(data, id) {
        return data;
    }


    async findByCriteria(criteria) {
        if (!criteria || Object.keys(criteria).length === 0) {
            throw new Error('Search criteria is required');
        }
        return this.repository.findBy(criteria);
    }

    async deleteAll() {
        return this.repository.deleteAll();
    }

    async findStudents(params) { return this.findAll(params); }
    async getStudentById(id) { return this.findById(id); }
    async createStudent(data) { return this.create(data); }
    async updateStudent(id, data) { return this.update(id, data); }
    async deleteStudent(id) { return this.delete(id); }
}

module.exports = StudentService;
