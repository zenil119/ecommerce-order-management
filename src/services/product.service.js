import {
    createProduct,
    getAllProducts
} from '../repositories/product.repository.js'

const createProductService =
    async (
        productData,
        userId
    ) => {

        const {
            title,
            description,
            price,
            stock,
            category
        } = productData

        const product =
            await createProduct(

                title,
                description,
                price,
                stock,
                category,
                userId
            )

        return product
    }

const getProductsService =
    async (
        page,
        limit,
        search,
        category
    ) => {

        return await getAllProducts(

            page,
            limit,
            search,
            category
        )
    }

export {
    createProductService,
    getProductsService
}