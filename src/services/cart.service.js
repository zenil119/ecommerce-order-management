import AppError
from '../errors/apiErorr.js'

import {

    findCartByUserId,

    createCart,

    findCartItem,

    addCartItem,

    updateCartItemQuantity,

    getCartItems,

    removeCartItem,

    clearCart

}
from '../repositories/cart.repository.js'

const addToCartService =
    async (
        userId,
        productId,
        quantity
    ) => {

        /*
        -----------------------------------
        Find/Create Cart
        -----------------------------------
        */

        let cart =
            await findCartByUserId(
                userId
            )

        if (!cart) {

            cart =
                await createCart(
                    userId
                )
        }

        /*
        -----------------------------------
        Check existing item
        -----------------------------------
        */

        const existingItem =
            await findCartItem(

                cart.id,

                productId
            )

        /*
        -----------------------------------
        Update quantity
        -----------------------------------
        */

        if (existingItem) {

            return await
                updateCartItemQuantity(

                    existingItem.id,

                    existingItem.quantity
                    +
                    quantity
                )
        }

        /*
        -----------------------------------
        Add new item
        -----------------------------------
        */

        return await addCartItem(

            cart.id,

            productId,

            quantity
        )
    }

const getCartService =
    async (userId) => {

        const cart =
            await findCartByUserId(
                userId
            )

        if (!cart) {

            return []
        }

        return await getCartItems(
            cart.id
        )
    }

const updateCartItemService =
    async (
        cartItemId,
        quantity
    ) => {

        return await
            updateCartItemQuantity(

                cartItemId,

                quantity
            )
    }

const removeCartItemService =
    async (cartItemId) => {

        await removeCartItem(
            cartItemId
        )
    }

const clearCartService =
    async (userId) => {

        const cart =
            await findCartByUserId(
                userId
            )

        if (!cart) {

            throw new AppError(
                'Cart not found',
                404
            )
        }

        await clearCart(cart.id)
    }

export {

    addToCartService,

    getCartService,

    updateCartItemService,

    removeCartItemService,

    clearCartService
}