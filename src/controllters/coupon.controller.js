import { createCouponService } from "../services/coupon.service.js"
import asyncHandler from "../utils/asyncHandler.js"
import successResponse from "../utils/successResponse.js"


const createCouponController =
    asyncHandler(async (
        req,
        res
    ) => {

        const coupon =
            await createCouponService(
                req.body
            )

        successResponse(

            res,

            'Coupon created successfully',

            coupon,

            201
        )
    })

export {
    createCouponController
}