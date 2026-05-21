

import pool from '../config/db.js'
import AppError from '../errors/apiErorr.js'
import { createCouponUsage, getCouponByCode, getUserCouponUsage, incrementCouponUsage } from '../repositories/coupon.repository.js'
import {
    bulkCreateOrderItems,
    bulkUpdateProductStock,
    createOrder,
    createOrderItem,
    getProductsByIds
}
    from '../repositories/order.repository.js'

const createOrderService =
    async (
        items,
        userId,
        couponCode
    ) => {

        const client =
            await pool.connect()

        try {

            await client.query('BEGIN')

            const productIds =
                items.map(
                    item => item.productId
                )


            const products =
                await getProductsByIds(
                    client,
                    productIds
                )


            const productMap = {}

            products.forEach(product => {

                productMap[product.id] =
                    product
            })

            let totalPrice = 0

            const productDetails = []

            for (const item of items) {

                const product =
                    productMap[
                    item.productId
                    ]

                if (!product) {

                    throw new AppError(
                        'Product not found',
                        404
                    )
                }

                if (
                    product.stock <
                    item.quantity
                ) {

                    throw new AppError(

                        `Insufficient stock for ${product.title}`,

                        400
                    )
                }

                totalPrice +=

                    Number(product.price) *

                    item.quantity

                productDetails.push({

                    product,

                    quantity:
                        item.quantity
                })
            }
            let coupon = null

            let discountAmount = 0

            let finalPrice = totalPrice

            /*
            -----------------------------------
            Coupon Validation
            -----------------------------------
            */

            if (couponCode) {

                coupon =
                    await getCouponByCode(

                        client,

                        couponCode
                    )

                if (!coupon) {

                    throw new AppError(
                        'Invalid coupon',
                        400
                    )
                }

                if (!coupon.is_active) {

                    throw new AppError(
                        'Coupon inactive',
                        400
                    )
                }

                if (
                    coupon.expires_at
                    &&
                    new Date(coupon.expires_at)
                    <
                    new Date()
                ) {

                    throw new AppError(
                        'Coupon expired',
                        400
                    )
                }

                if (
                    coupon.used_count >=
                    coupon.usage_limit
                ) {

                    throw new AppError(
                        'Coupon usage limit exceeded',
                        400
                    )
                }

                if (
                    totalPrice <
                    coupon.min_order_amount
                ) {

                    throw new AppError(

                        `Minimum order amount is ${coupon.min_order_amount}`,

                        400
                    )
                }

                /*
                -----------------------------------
                User Usage Validation
                -----------------------------------
                */

                const userUsageCount =
                    await getUserCouponUsage(

                        client,

                        coupon.id,

                        userId
                    )

                if (
                    userUsageCount >=
                    coupon.per_user_limit
                ) {

                    throw new AppError(

                        'Coupon usage limit reached for this user',

                        400
                    )
                }

                /*
                -----------------------------------
                Calculate Discount
                -----------------------------------
                */

                if (
                    coupon.discount_type
                    === 'PERCENTAGE'
                ) {

                    discountAmount =

                        (
                            totalPrice *
                            Number(
                                coupon.discount_value
                            )
                        ) / 100

                    if (
                        coupon.max_discount
                    ) {

                        discountAmount =
                            Math.min(

                                discountAmount,

                                Number(
                                    coupon.max_discount
                                )
                            )
                    }

                } else {

                    discountAmount =
                        Number(
                            coupon.discount_value
                        )
                }

                finalPrice =
                    totalPrice -
                    discountAmount
            }

            const order =
                await createOrder(

                    client,

                    userId,

                    totalPrice,

                    coupon?.code || null,

                    discountAmount,

                    finalPrice
                )
            if (coupon) {

                await incrementCouponUsage(

                    client,

                    coupon.id
                )

                await createCouponUsage(

                    client,

                    coupon.id,

                    userId,

                    order.id
                )
            }

            await bulkCreateOrderItems(

                client,

                order.id,

                productDetails
            )

            await bulkUpdateProductStock(

                client,

                productDetails
            )

            await client.query('COMMIT')

            return order

        } catch (error) {

            await client.query(
                'ROLLBACK'
            )

            throw error

        } finally {

            client.release()
        }
    }

export {
    createOrderService
}