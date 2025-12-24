const serialize = require('./_serializer')
const Model = require('@models/mongodb/schemas/generator')
const { getQueryParams, getQueryPaging } = require('@utils/schema')

class ControllerController {
    static async find(params) {
        const { filter, w_regx, sort, skip, limit, draw } = await getQueryParams(
            params
        )

        const recordsTotal = await Model.countDocuments(filter)

        return Model.find(filter)
            .or({ $or: w_regx })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .then((data) => {
                return serialize({
                    data,
                    draw,
                    recordsTotal,
                    recordsFiltered: recordsTotal,
                })
            })
    }

    static findById(id) {
        return Model.findById(id).then(serialize)
    }

    static async findBy(params) {
        const { filter } = await getQueryPaging(params)
        return Model.find(filter).then(serialize)
    }

    static create(dataObj) {
        return Model.create(dataObj).then(serialize)
    }

    static update(id, dataObj) {
        return Model.findByIdAndUpdate(id, dataObj).then(serialize)
    }

    static drop(id) {
        return Model.findByIdAndDelete(id).then(serialize)
    }

    static dropAll() {
        return Model.deleteMany({})
    }
}

module.exports = ControllerController
