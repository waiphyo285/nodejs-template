const BaseRepository = require('./base.repository');
const schema = require('@utils/schema.util');
const Database = require('@models/mysql/connection');
const Op = Database.Sequelize.Op;

/**
 * MySQL Base Repository
 * Implements standard Sequelize operations.
 */
class MySQLRepository extends BaseRepository {
    constructor(model, searchFields = []) {
        super();
        this.model = model;
        this.searchFields = searchFields;
    }

    async find(query = {}) {
        const {
            sort,
            filter,
            skip: offset,
            limit,
            draw,
        } = await schema.getPagingQuery(query, this.searchFields);

        const condition = filter.search
            ? {
                [Op.or]: this.searchFields.map(field => ({
                    [field]: { [Op.like]: `%${filter.search}%` }
                }))
            }
            : {};

        const result = await this.model.findAndCountAll({
            where: condition,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        return {
            data: result.rows,
            draw,
            recordsTotal: result.count,
            recordsFiltered: result.count,
        };
    }

    async findById(id) {
        return this.model.findByPk(id);
    }

    async create(data) {
        return this.model.create(data);
    }

    async update(id, data) {
        await this.model.update(data, { where: { id: id } });
        return this.model.findByPk(id);
    }

    async delete(id) {
        return this.model.destroy({ where: { id: id } });
    }
}

module.exports = MySQLRepository;
