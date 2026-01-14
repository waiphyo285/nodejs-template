const BaseService = require('./base.service');

/**
 * Teacher Service
 */
class TeacherService extends BaseService {
    constructor(teacherRepository) {
        super(teacherRepository);
    }

    async onBeforeCreate(data) {
        return data;
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

    // Aliases
    async findTeachers(params) { return this.findAll(params); }
    async getTeacherById(id) { return this.findById(id); }
    async createTeacher(data) { return this.create(data); }
    async updateTeacher(id, data) { return this.update(id, data); }
    async deleteTeacher(id) { return this.delete(id); }
}

module.exports = TeacherService;
