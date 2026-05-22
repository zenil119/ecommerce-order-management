import express from 'express'
import dotenv from 'dotenv'
import mainRoute from './routes/index.js'


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

        successResponse(
            res,
            'New deployment working 🚀',
            {
                version: 'v2',
                time: new Date()
            }
        )
    })
)

app.use('/', mainRoute)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})