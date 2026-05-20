

import { loginService, registerService } from '../services/auth.service.js'
import asyncHandler from '../utils/asyncHandler.js'
import successResponse from '../utils/successResponse.js'

const registerController =
    asyncHandler(async (req, res) => {

        const {
            name,
            email,
            password
        } = req.body

        const user =
            await registerService(
                name,
                email,
                password
            )

        successResponse(
            res,
            'User registered successfully',
            user,
            201
        )
    })

const loginController =
    asyncHandler(async (req, res) => {

        const {
            email,
            password
        } = req.body

        const data =
            await loginService(
                email,
                password
            )

        successResponse(
            res,
            'Login successful',
            data
        )
    })

export {
    registerController,
    loginController
}