import express from 'express'

import {
    registerController,
    loginController
} from '../controllters/auth.controller.js'
import validateMiddleware from '../middlewares/validateMiddleware.js'
import { loginSchema, registerSchema } from '../validations/auth.validation.js'

const router = express.Router()

router.post(
    '/register',
    validateMiddleware(registerSchema),
    registerController
)

router.post(
    '/login',
    validateMiddleware(loginSchema),
    loginController
)

export default router