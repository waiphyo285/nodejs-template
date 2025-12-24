const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        name: joi
            .string()
            .required()
            .error(() => 'name must be a string'),
        age: joi.number().error(() => 'age must be a number'),
        grade: joi.number().error(() => 'grade must be a number'),
        images: joi.array().items(joi.string()).error(() => 'images must be an array of strings'),
        remove_images: joi.array().items(joi.string()).error(() => 'remove_images must be an array of strings'),
    })
    .unknown(true)
