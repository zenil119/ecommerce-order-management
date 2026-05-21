

import {
    createProductService,
    getProductsService
}
    from '../services/product.service.js'
import asyncHandler from '../utils/asyncHandler.js'
import successResponse from '../utils/successResponse.js'

const createProductController =
    asyncHandler(async (
        req,
        res
    ) => {

        const product =
            await createProductService(
                req.body,
                req.user.id
            )

        successResponse(

            res,

            'Product created successfully',

            product,

            201
        )
    })

const getProductsController =
    asyncHandler(async (
        req,
        res
    ) => {

        const {
            page = 1,
            limit = 10,
            search,
            category
        } = req.query

        const products =
            await getProductsService(

                page,
                limit,
                search,
                category
            )

        successResponse(

            res,

            'Products fetched successfully',

            products
        )
    })

export {
    createProductController,
    getProductsController
}