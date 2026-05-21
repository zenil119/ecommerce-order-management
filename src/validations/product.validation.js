import Joi from 'joi'

const createProductSchema =
    Joi.object({

        title: Joi.string()
            .min(3)
            .max(255)
            .required(),

        description: Joi.string()
            .allow(''),

        price: Joi.number()
            .positive()
            .required(),

        stock: Joi.number()
            .integer()
            .min(0)
            .required(),

        category: Joi.string()
            .required()
    })

const productQuerySchema =
    Joi.object({

        page: Joi.number()
            .integer()
            .min(1)
            .default(1),

        limit: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .default(10),

        search: Joi.string()
            .allow(''),

        category: Joi.string()
            .allow('')
    })

export {
    createProductSchema,
    productQuerySchema
}