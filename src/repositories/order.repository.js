const createOrder = async (

    client,

    userId,

    totalPrice,

    couponCode,

    discountAmount,

    finalPrice
) => {

    const result =
        await client.query(

            `
            INSERT INTO orders
            (
                user_id,
                total_price,
                coupon_code,
                discount_amount,
                final_price
            )

            VALUES ($1, $2, $3, $4, $5)

            RETURNING *
            `,

            [

                userId,

                totalPrice,

                couponCode,

                discountAmount,

                finalPrice
            ]
        )

    return result.rows[0]
}

const createOrderItem =
    async (
        client,
        orderId,
        productId,
        quantity,
        price
    ) => {

        await client.query(

            `
            INSERT INTO order_items
            (
                order_id,
                product_id,
                quantity,
                price
            )

            VALUES ($1, $2, $3, $4)
            `,

            [
                orderId,
                productId,
                quantity,
                price
            ]
        )
    }

const getProductsByIds =
    async (
        client,
        productIds
    ) => {

        const result =
            await client.query(

                `
                SELECT *
                FROM products
                WHERE id = ANY($1)
                `,

                [productIds]
            )

        return result.rows
    }

const bulkUpdateProductStock =
    async (
        client,
        productDetails
    ) => {

        let query = `

            UPDATE products

            SET stock = CASE
        `

        const values = []

        const ids = []

        let count = 1

        for (
            const item
            of productDetails
        ) {

            query += `

                WHEN id = $${count}

                THEN stock - $${count + 1}
            `

            values.push(

                item.product.id,

                item.quantity
            )

            ids.push(
                item.product.id
            )

            count += 2
        }

        query += `
        
            END
            
            WHERE id IN (
                ${ids.join(',')}
            )
        `

        await client.query(
            query,
            values
        )
    }

const bulkCreateOrderItems =
    async (
        client,
        orderId,
        productDetails
    ) => {

        const values = []

        const placeholders = []

        let count = 1

        for (
            const item
            of productDetails
        ) {

            placeholders.push(

                `(
                    $${count},
                    $${count + 1},
                    $${count + 2},
                    $${count + 3}
                )`
            )

            values.push(

                orderId,

                item.product.id,

                item.quantity,

                item.product.price
            )

            count += 4
        }

        const query = `

            INSERT INTO order_items
            (
                order_id,
                product_id,
                quantity,
                price
            )

            VALUES
            ${placeholders.join(',')}
        `

        await client.query(
            query,
            values
        )
    }

export {
    createOrder,
    createOrderItem,
    getProductsByIds,
    bulkUpdateProductStock,
    bulkCreateOrderItems
}