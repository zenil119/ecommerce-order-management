import jwt from 'jsonwebtoken'
import AppError from '../errors/apiErorr.js'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return next(
            new AppError(
                'token missing',
                401
            )
        )
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
        return next(
            new AppError(
                'Invalid token format',
                401
            )
        )
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        return next(
            new AppError(
                'Invalid or expired token',
                401
            )
        )
    }
}

export default authMiddleware