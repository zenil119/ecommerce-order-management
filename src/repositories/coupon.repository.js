import pool from "../config/db.js"

const createCoupon =
    async (couponData) => {

        const {

            code,

            discount_type,

            discount_value,

            min_order_amount,

            max_discount,

            usage_limit,

            per_user_limit,

            expires_at

        } = couponData

        const result =
            await pool.query(

                `
                INSERT INTO coupons
                (
                    code,
                    discount_type,
                    discount_value,
                    min_order_amount,
                    max_discount,
                    usage_limit,
                    per_user_limit,
                    expires_at
                )

                VALUES
                ($1,$2,$3,$4,$5,$6,$7,$8)

                RETURNING *
                `,

                [

                    code,

                    discount_type,

                    discount_value,

                    min_order_amount,

                    max_discount,

                    usage_limit,

                    per_user_limit,

                    expires_at
                ]
            )

        return result.rows[0]
    }

const getCouponByCode =
    async (
        client,
        code
    ) => {

        const result =
            await client.query(

                `
                SELECT *

                FROM coupons

                WHERE code = $1

                FOR UPDATE
                `,

                [code]
            )

        return result.rows[0]
    }

const getUserCouponUsage =
    async (
        client,
        couponId,
        userId
    ) => {

        const result =
            await client.query(

                `
                SELECT COUNT(*) AS total

                FROM coupon_usages

                WHERE coupon_id = $1
                AND user_id = $2
                `,

                [
                    couponId,
                    userId
                ]
            )

        return Number(
            result.rows[0].total
        )
    }

const incrementCouponUsage =
    async (
        client,
        couponId
    ) => {

        await client.query(

            `
            UPDATE coupons

            SET used_count =
            used_count + 1

            WHERE id = $1
            `,

            [couponId]
        )
    }

const createCouponUsage =
    async (
        client,
        couponId,
        userId,
        orderId
    ) => {

        await client.query(

            `
            INSERT INTO coupon_usages
            (
                coupon_id,
                user_id,
                order_id
            )

            VALUES ($1, $2, $3)
            `,

            [
                couponId,
                userId,
                orderId
            ]
        )
    }

export {

    createCoupon,

    getCouponByCode,

    getUserCouponUsage,

    incrementCouponUsage,

    createCouponUsage
}