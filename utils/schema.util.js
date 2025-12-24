const { getDateRange } = require('./index')
const { mongoose } = require('@models/mongodb/connection')
const CodeModel = require('@models/mongodb/schemas/code.schema')

/**
 * Models Functions
 */

const schema = (module.exports = {})

schema.objectId = function (id) {
    return id ? mongoose.Types.ObjectId(id) : mongoose.Types.ObjectId()
}

schema.getTotalDocs = async function (model, filter = {}) {
    return mongoose.model(model).countDocuments(filter, (err, count) => {
        if (err) throw new Error(err)
        return count
    })
}

schema.generateCode = async function (args) {
    const { type, prefix = '', start = 8, isPlain = false } = args

    const updateCode = await CodeModel.findOneAndUpdate(
        { type, prefix },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
    )

    if (isPlain) return updateCode.count

    // return XXX-NNNNNNNN => INV-00000001 format
    return `${prefix}-${String(updateCode.count).padStart(start, '0')}`
}

schema.checkReference = async function (models) {
    return await models.map((model) => (callback) => {
        mongoose
            .model(model.name)
            .findOne({ [model.key]: model.value }, { _id: 1 })
            .exec((error, result) => {
                if (error) {
                    return callback(error, undefined)
                } else {
                    return callback(undefined, result ? 1 : 0)
                }
            })
    })
}

schema.getFilterQuery = async function (args) {
    let page = args.page || {}

    let sort = args.sort || {}
    let filter = args.filter || {}

    let skip = Number.parseInt(page.skip) || 0
    let limit = Number.parseInt(page.limit) || 10

    skip = skip * limit

    for (const i in sort) {
        sort[i] = Number.parseInt(sort[i])
    }

    if (args.created_at) {
        filter['created_at'] = await getDateRange(args.created_at)
    }

    return { sort, filter, skip, limit }
}

schema.getPagingQuery = async function (args, words = ['name']) {
    const {
        start,
        length,
        draw = '1',
        columns = [{ data: '_id' }],
        order = [{ column: 0, dir: 'asc' }],
        search = { value: '', regex: 'false' },
        created_at,
    } = args

    const sort = {}
    const filter = {}
    const w_regx = words

    const skip = Number.parseInt(start) || 0
    let limit = Number.parseInt(length) || 10

    if (limit === -1) {
        limit = undefined
    }

    if (created_at) {
        filter['created_at'] = await getDateRange(created_at)
    }

    if (order) {
        for (const i in order) {
            sort[columns[i].data] = order[i].dir === 'asc' ? 1 : -1
        }
    }

    if (search && w_regx.length > 0) {
        for (const i in w_regx) {
            const regx = new RegExp(
                // eslint-disable-next-line no-useless-escape
                search.value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''),
                'i'
            )
            w_regx[i] = { [w_regx[i]]: { $regex: regx } }
        }
    }

    return { filter, w_regx, sort, skip, limit, draw }
}
