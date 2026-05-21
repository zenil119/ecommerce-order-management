import express from 'express'

import roleMiddleware from '../middlewares/roleMiddleware.js'

import {
    createProductController,
    getProductsController
}
    from '../controllters/product.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import validateMiddleware from '../middlewares/validateMiddleware.js'
import { createProductSchema, productQuerySchema } from '../validations/product.validation.js'

const router = express.Router()

router.post(
    '/',
    authMiddleware,
    roleMiddleware('ADMIN'),
    validateMiddleware(
        createProductSchema
    ),
    createProductController
)

router.get(
    '/',
    validateMiddleware(
        productQuerySchema,
        'query'
    ),
    getProductsController
)

export default router