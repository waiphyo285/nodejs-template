const joi = require('joi')

module.exports = joi
    .object()
    .keys({
        role: joi.string().required(),
        level: joi.string().required(),
        program: joi
            .array()
            .items(
                joi
                    .object()
                    .keys({
                        menuid: joi.string(),
                        access: joi.string(),
                        submenu: joi.array().items(
                            joi
                                .object()
                                .keys({
                                    menuid: joi.string(),
                                    access: joi.string(),
                                    read: joi.string(),
                                    edit: joi.string(),
                                    delete: joi.string(),
                                })
                                .default([])
                        ),
                    })
                    .unknown(true)
            )
            .default([]),
    })
    .unknown(true)
