import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import validateMiddleware from '../middlewares/validateMiddleware.js'
import { createOrderSchema } from '../validations/order.validation.js'
import { createOrderController } from '../controllters/order.controller.js'


const router = express.Router()

router.post(

    '/',

    authMiddleware,

    validateMiddleware(
        createOrderSchema
    ),

    createOrderController
)

export default router