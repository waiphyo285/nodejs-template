const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        name: joi
            .string()
            .required()
            .error(() => 'name must be a string'),
        age: joi.number().error(() => 'age must be a number'),
        degree: joi.string().error(() => 'grade must be a number'),
    })
    .unknown(true)
