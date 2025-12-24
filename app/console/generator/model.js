const { mongoose } = require('../connection')
const SchemaPlugin = require('./helpers/schema-plugin')

const Schema = mongoose.Schema

const ControllerSchema = new Schema()

ControllerSchema.plugin(SchemaPlugin)

module.exports = mongoose.model('generator', ControllerSchema)
