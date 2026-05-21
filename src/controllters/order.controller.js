import { createOrderService } from "../services/order.service.js"
import asyncHandler from "../utils/asyncHandler.js"
import successResponse from "../utils/successResponse.js"


const createOrderController =
    asyncHandler(async (
        req,
        res
    ) => {

        const {
            items,
            couponCode
        } = req.body

        const order =
            await createOrderService(

                items,

                req.user.id,

                couponCode
            )

        successResponse(

            res,

            'Order created successfully',

            order,

            201
        )
    })

export {
    createOrderController
}