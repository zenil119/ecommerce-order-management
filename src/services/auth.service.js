import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../repositories/auth.repository.js'
import AppError from '../errors/apiErorr.js'

const registerService = async (
    name,
    email,
    password
) => {

    const existingUser =
        await findUserByEmail(email)

    if (existingUser) {

        throw new AppError(
            'Email already exists',
            400
        )
    }

    const hashedPassword =
        await bcrypt.hash(password, 10)

    const user = await createUser(
        name,
        email,
        hashedPassword
    )

    return user
}

const loginService = async (
    email,
    password
) => {

    const user =
        await findUserByEmail(email)

    if (!user) {

        throw new AppError(
            'Invalid credentials',
            401
        )
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        )

    if (!isMatch) {

        throw new AppError(
            'Invalid credentials',
            401
        )
    }

    const token = jwt.sign(

        {
            id: user.id,
            role: user.role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: '1d'
        }
    )

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}

export {
    registerService,
    loginService
}