import Joi from 'joi'

const createOrderSchema =
    Joi.object({

        items: Joi.array()

            .items(

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
            )

            .min(1)

            .required(),

        couponCode:
            Joi.string()
            .allow('')
    })

export {
    createOrderSchema
}