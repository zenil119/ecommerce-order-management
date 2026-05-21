import express from 'express'
import authRoute from './auth.routes.js'
import productRoute from './product.routes.js'
import orderRoute from './order.routes.js'
import cartRoute from './cart.routes.js'
import couponRoute from './coupon.routes.js'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/product', productRoute)
router.use('/order', orderRoute)
router.use('/cart', cartRoute)
router.use('/coupon', couponRoute)

export default router