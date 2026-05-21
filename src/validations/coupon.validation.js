import Joi from 'joi'

const createCouponSchema =
    Joi.object({

        code:
            Joi.string()
            .required(),

        discount_type:
            Joi.string()
            .valid(
                'PERCENTAGE',
                'FLAT'
            )
            .required(),

        discount_value:
            Joi.number()
            .positive()
            .required(),

        min_order_amount:
            Joi.number()
            .min(0),

        max_discount:
            Joi.number()
            .min(0),

        usage_limit:
            Joi.number()
            .integer()
            .min(1),

        per_user_limit:
            Joi.number()
            .integer()
            .min(1),

        expires_at:
            Joi.date()
    })

export {
    createCouponSchema
}