import pool from '../config/db.js'

const createProduct = async (
    title,
    description,
    price,
    stock,
    category,
    createdBy
) => {

    const query = `

        INSERT INTO products
        (
            title,
            description,
            price,
            stock,
            category,
            created_by
        )

        VALUES ($1, $2, $3, $4, $5, $6)

        RETURNING *
    `

    const values = [
        title,
        description,
        price,
        stock,
        category,
        createdBy
    ]

    const result =
        await pool.query(
            query,
            values
        )

    return result.rows[0]
}

const getAllProducts = async (

    page,
    limit,
    search,
    category

) => {

    const offset =
        (page - 1) * limit

    let query = `
    
        SELECT *
        
        FROM products
        
        WHERE 1=1
    `

    const values = []

    let count = 1

    if (search) {

        query += `
        
            AND title ILIKE $${count}
        `

        values.push(`%${search}%`)

        count++
    }

    if (category) {

        query += `
        
            AND category = $${count}
        `

        values.push(category)

        count++
    }

    query += `
    
        ORDER BY id DESC
        
        LIMIT $${count}
        
        OFFSET $${count + 1}
    `

    values.push(limit, offset)

    const result =
        await pool.query(
            query,
            values
        )

    return result.rows
}

export {
    createProduct,
    getAllProducts
}