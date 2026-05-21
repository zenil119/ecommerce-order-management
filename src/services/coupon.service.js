import { createCoupon } from "../repositories/coupon.repository.js"

const createCouponService =
    async (couponData) => {

        return await createCoupon(
            couponData
        )
    }

export {
    createCouponService
}