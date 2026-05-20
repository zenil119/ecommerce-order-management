import pool from '../config/db.js'

import AppError from '../errors/AppError.js'

const ownershipMiddleware =
    async (
        req,
        res,
        next
    ) => {

        const orderId = req.params.id

        const result =
            await pool.query(

                `
                SELECT * FROM orders
                WHERE id = $1
                `,
                [orderId]
            )

        const order = result.rows[0]

        if (!order) {

            return next(
                new AppError(
                    'Order not found',
                    404
                )
            )
        }

        if (
            order.user_id !== req.user.id
        ) {

            return next(
                new AppError(
                    'Unauthorized access',
                    403
                )
            )
        }

        next()
    }

export default ownershipMiddleware