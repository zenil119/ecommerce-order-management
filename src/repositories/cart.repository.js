
import pool from "../config/db.js"

/*
-----------------------------------
Find cart by user
-----------------------------------
*/


const findCartByUserId =
    async (userId) => {

        const result =
            await pool.query(

                `
                SELECT *
                FROM carts
                WHERE user_id = $1
                `,

                [userId]
            )

        return result.rows[0]
    }

/*
-----------------------------------
Create new cart
-----------------------------------
*/

const createCart =
    async (userId) => {

        const result =
            await pool.query(

                `
                INSERT INTO carts
                (user_id)

                VALUES ($1)

                RETURNING *
                `,

                [userId]
            )

        return result.rows[0]
    }

/*
-----------------------------------
Find cart item
-----------------------------------
*/

const findCartItem =
    async (
        cartId,
        productId
    ) => {

        const result =
            await pool.query(

                `
                SELECT *
                FROM cart_items

                WHERE cart_id = $1
                AND product_id = $2
                `,

                [cartId, productId]
            )

        return result.rows[0]
    }

/*
-----------------------------------
Add new cart item
-----------------------------------
*/

const addCartItem =
    async (
        cartId,
        productId,
        quantity
    ) => {

        const result =
            await pool.query(

                `
                INSERT INTO cart_items
                (
                    cart_id,
                    product_id,
                    quantity
                )

                VALUES ($1, $2, $3)

                RETURNING *
                `,

                [
                    cartId,
                    productId,
                    quantity
                ]
            )

        return result.rows[0]
    }

/*
-----------------------------------
Increase quantity
-----------------------------------
*/

const updateCartItemQuantity =
    async (
        cartItemId,
        quantity
    ) => {

        const result =
            await pool.query(

                `
                UPDATE cart_items

                SET quantity = $1

                WHERE id = $2

                RETURNING *
                `,

                [
                    quantity,
                    cartItemId
                ]
            )

        return result.rows[0]
    }

/*
-----------------------------------
Get full cart
-----------------------------------
*/

const getCartItems =
    async (cartId) => {

        const result =
            await pool.query(

                `
                SELECT

                    cart_items.id,
                    cart_items.quantity,

                    products.id
                    AS product_id,

                    products.title,

                    products.price,

                    products.stock,

                    (
                        products.price
                        *
                        cart_items.quantity
                    ) AS total

                FROM cart_items

                JOIN products

                ON products.id =
                cart_items.product_id

                WHERE cart_items.cart_id = $1
                `,

                [cartId]
            )

        return result.rows
    }

/*
-----------------------------------
Delete cart item
-----------------------------------
*/

const removeCartItem =
    async (cartItemId) => {

        await pool.query(

            `
            DELETE FROM cart_items

            WHERE id = $1
            `,

            [cartItemId]
        )
    }

/*
-----------------------------------
Clear cart
-----------------------------------
*/

const clearCart =
    async (cartId) => {

        await pool.query(

            `
            DELETE FROM cart_items

            WHERE cart_id = $1
            `,

            [cartId]
        )
    }

export {

    findCartByUserId,

    createCart,

    findCartItem,

    addCartItem,

    updateCartItemQuantity,

    getCartItems,

    removeCartItem,

    clearCart
}