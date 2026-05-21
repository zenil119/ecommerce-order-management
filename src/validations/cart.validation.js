import Joi from 'joi'

const addToCartSchema =
    Joi.object({

        productId:
            Joi.number()
            .required(),

        quantity:
            Joi.number()
            .integer()
            .min(1)
            .required()
    })

const updateCartSchema =
    Joi.object({

        quantity:
            Joi.number()
            .integer()
            .min(1)
            .required()
    })

export {
    addToCartSchema,
    updateCartSchema
}