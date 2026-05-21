

import {

    addToCartService,

    getCartService,

    updateCartItemService,

    removeCartItemService,

    clearCartService

}
from '../services/cart.service.js'
import asyncHandler from '../utils/asyncHandler.js'
import successResponse from '../utils/successResponse.js'

const addToCartController =
    asyncHandler(async (
        req,
        res
    ) => {

        const {
            productId,
            quantity
        } = req.body

        const item =
            await addToCartService(

                req.user.id,

                productId,

                quantity
            )

        successResponse(

            res,

            'Item added to cart',

            item,

            201
        )
    })

const getCartController =
    asyncHandler(async (
        req,
        res
    ) => {

        const cart =
            await getCartService(
                req.user.id
            )

        successResponse(

            res,

            'Cart fetched successfully',

            cart
        )
    })

const updateCartController =
    asyncHandler(async (
        req,
        res
    ) => {

        const item =
            await updateCartItemService(

                req.params.id,

                req.body.quantity
            )

        successResponse(

            res,

            'Cart updated successfully',

            item
        )
    })

const removeCartItemController =
    asyncHandler(async (
        req,
        res
    ) => {

        await removeCartItemService(
            req.params.id
        )

        successResponse(

            res,

            'Item removed from cart'
        )
    })

const clearCartController =
    asyncHandler(async (
        req,
        res
    ) => {

        await clearCartService(
            req.user.id
        )

        successResponse(

            res,

            'Cart cleared successfully'
        )
    })

export {
    addToCartController,
    getCartController,
    updateCartController,
    removeCartItemController,
    clearCartController
}