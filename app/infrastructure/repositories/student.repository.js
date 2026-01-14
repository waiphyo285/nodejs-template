const MySQLRepository = require('./mysql.repository');
const Database = require('@models/mysql/connection');
const utils = require('@utils/index');

const Student = Database.students;

/**
 * Student Repository (MySQL Implementation)
 */
class StudentRepositoryMySQL extends MySQLRepository {
    constructor() {
        super(Student, ['name', 'grade']);
    }


    async update(id, data) {
        if (data.remove_images && data.remove_images.length > 0) {
            await utils.removeImages(data.remove_images);
        }
        delete data.remove_images;

        return super.update(id, data);
    }

    async findBy(query = {}) {
        const { filter } = await require('@utils/schema.util').getFilterQuery(query);
        return Student.findAll({ where: filter });
    }

    async deleteAll() {
        return Student.destroy({ where: {}, truncate: false });
    }
}

module.exports = StudentRepositoryMySQL;
