const { mongoose } = require('../connection')
const SchemaPlugin = require('./helpers/schema-plugin')

const Schema = mongoose.Schema
const makeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        default: [],
    },
    status: {
        type: Boolean,
        default: false,
    },
    created_at: { type: Date },
    updated_at: { type: Date },
})

makeSchema.plugin(SchemaPlugin)

module.exports = mongoose.model('student', makeSchema)
