const MySQLRepository = require('./mysql.repository');
const Database = require('@models/mysql/connection');

const Teacher = Database.teachers;

/**
 * Teacher Repository (MySQL Implementation)
 */
class TeacherRepositoryMySQL extends MySQLRepository {
    constructor() {
        super(Teacher, ['name', 'degree']);
    }

    async findBy(query = {}) {
        const { filter } = await require('@utils/schema.util').getFilterQuery(query);
        return Teacher.findAll({ where: filter });
    }

    async deleteAll() {
        return Teacher.destroy({ where: {}, truncate: false });
    }
}

module.exports = TeacherRepositoryMySQL;
