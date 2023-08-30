import { Link } from "react-router-dom"
import { fetchAllProductsAsync } from '../product-list/productListSlice.js'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

const ProductList = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.products)

    useEffect(() => {
        dispatch(fetchAllProductsAsync())
    }, [dispatch])

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative bg-white shadow-md rounded-md">
                            <Link to={'/product-details'}>
                                <div className="aspect-h-1 aspect-w-1 w-full rounded-t-md overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="my-2 flex justify-between px-4 py-2">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={'#'}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </a>
                                        </h3>
                                        <p className="text-sm font-medium">
                                            {
                                                product.stock ?
                                                    <p className="text-green-500">{`In stock: ${product.stock}`}</p> :
                                                    <p className="text-red-700">{'Out of Stock'}</p>
                                            }

                                        </p>
                                        <p className="flex my-2 justify-start items-baseline text-sm font-medium text-gray-900">
                                            <div className="">Rs. {Math.round(product.price - (product.discountPercentage * product.price) / 100)}</div>
                                            <div className="mx-1 text-xs text-gray-400 line-through">{product.price}</div>
                                        </p>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <p className="flex items-center justify-center ml-1 text-sm font-bold text-gray-500">
                                                {product.rating}
                                                <p className="ml-1 text-xs">/5</p>
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList
