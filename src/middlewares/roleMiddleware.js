import AppError from '../errors/AppError.js'

const roleMiddleware = (
    ...allowedRoles
) => {

    return (req, res, next) => {

        const userRole =
            req.user.role

        if (
            !allowedRoles.includes(userRole)
        ) {

            return next(
                new AppError(
                    'Access denied',
                    403
                )
            )
        }

        next()
    }
}

export default roleMiddleware