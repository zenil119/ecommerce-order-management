import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import validateMiddleware from '../middlewares/validateMiddleware.js'
import { addToCartSchema, updateCartSchema } from '../validations/cart.validation.js'
import { addToCartController, clearCartController, getCartController, removeCartItemController, updateCartController } from '../controllters/cart.controller.js'


const router = express.Router()

router.post(
    '/',
    authMiddleware,
    validateMiddleware(
        addToCartSchema
    ),
    addToCartController
)

router.get(
    '/',
    authMiddleware,
    getCartController
)

router.patch(
    '/:id',
    authMiddleware,
    validateMiddleware(
        updateCartSchema
    ),
    updateCartController
)

router.delete(
    '/:id',
    authMiddleware,
    removeCartItemController
)

router.delete(
    '/',
    authMiddleware,
    clearCartController
)

export default router