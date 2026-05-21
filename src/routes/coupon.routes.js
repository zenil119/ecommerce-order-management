import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import roleMiddleware from '../middlewares/roleMiddleware.js'
import validateMiddleware from '../middlewares/validateMiddleware.js'
import { createCouponSchema } from '../validations/coupon.validation.js'
import { createCouponController } from '../controllters/coupon.controller.js'


const router = express.Router()

router.post(

    '/',

    authMiddleware,

    roleMiddleware('ADMIN'),

    validateMiddleware(
        createCouponSchema
    ),

    createCouponController
)

export default router