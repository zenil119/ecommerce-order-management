import express from 'express'
import dotenv from 'dotenv'
import mainRoute from './routes/index.js'
import authMiddleware from './middlewares/authMiddleware.js'


import pool from './config/db.js'

import asyncHandler from './utils/asyncHandler.js'
import successResponse from './utils/successResponse.js'

import AppError from './errors/apiErorr.js'

import errorMiddleware from './middlewares/errorMiddleware.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get(
    '/',
    asyncHandler(async (req, res) => {

        const users = await pool.query(
            'SELECT * FROM users'
        )

        if (!users.rows.length) {
            throw new AppError(
                'No users found',
                404
            )
        }

        successResponse(
            res,
            'Users fetched successfully',
            users.rows
        )
    })
)

app.use(errorMiddleware)
app.use('/', mainRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})