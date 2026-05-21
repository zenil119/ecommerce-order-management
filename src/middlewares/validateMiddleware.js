import AppError from '../errors/AppError.js'

const validateMiddleware =
    (
        schema,
        property = 'body'
    ) => {

        return (req, res, next) => {

            const { error, value } =
                schema.validate(
                    req[property]
                )

            if (error) {

                return next(

                    new AppError(
                        error.details[0].message,
                        400
                    )
                )
            }

            req[property] = value

            next()
        }
    }

export default validateMiddleware