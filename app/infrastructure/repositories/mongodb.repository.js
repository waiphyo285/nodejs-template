const BaseRepository = require('./base.repository');
const schema = require('@utils/schema.util');

/**
 * MongoDB Base Repository
 * Implements standard Mongoose operations.
 */
class MongoDBRepository extends BaseRepository {
    constructor(model, searchFields = []) {
        super();
        this.model = model;
        this.searchFields = searchFields;
    }

    async find(query = {}) {
        const { filter, w_regx, sort, skip, limit, draw } =
            await schema.getPagingQuery(query, this.searchFields);

        const recordsTotal = await this.model.countDocuments(filter);

        const result = await this.model.find(filter)
            .or({ $or: w_regx })
            .sort(sort)
            .skip(skip)
            .limit(limit);

        return {
            data: result,
            draw,
            recordsTotal,
            recordsFiltered: recordsTotal,
        };
    }

    async findById(id) {
        return this.model.findById(id).lean();
    }

    async findOne(filter) {
        return this.model.findOne(filter).lean();
    }

    async create(data) {
        const doc = new this.model(data);
        return doc.save();
    }

    async update(id, data) {
        return this.model.findOneAndUpdate({ _id: id }, data, {
            new: true,
        }).lean();
    }

    async delete(id) {
        return this.model.findByIdAndDelete(id).lean();
    }
}

module.exports = MongoDBRepository;
