import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProducts, fetchProductsByFilters } from "./productListAPI"

const initialState = {
    brands: [],
    categories: [],
    products: [],
    // filters: [],
    isLoading: false,
    error: null
}

export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProductsAsync',
    async () => {
        const data = await fetchProducts()
        return data
    }
)

export const fetchAllProductsByFiltersAsync = createAsyncThunk(
    'product/fetchAllProductsByFiltersAsync',
    async (productfilters) => {
        // console.log('inside fetchAllProductsByFiltersAsync: \n', productfilters)
        const data = await fetchProductsByFilters(productfilters)
        // console.log(data)
        return data
        // return []
    }
)

const getCategoryList = (products) => {
    let categories = [...new Set(products.map((p) => p['category']))]
    categories = categories.map((category) => {
        let label = category.split('-').map((c) => {
            return c.slice(0,1).toUpperCase() + c.slice(1,c.length)
        }).join(' ')

        return {
            value: category,
            label,
            checked: false
        }
    })
    return categories
}

const getBrandList = (products) => {
    let brands = [...new Set(products.map((p) => p['brand']))]
    brands = brands.map((brand) => {
        return {
            value: brand,
            label: brand,
            checked: false
        }
    })
    return brands
}

const getDiscountedPrice = (p) => p.price - p.price*(p.discountPercentage/100)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        updateBrands: (state, action) => {
            const { index, value } = action.payload
            state.brands[index].checked = value
        }, 
        updateCategories: (state, action) => {
            const { index, value } = action.payload
            state.categories[index].checked = value
        },
        sortProducts: (state, action) => {
            const id = action.payload
            switch (id) {
                case 'sort-by-price-asc': 
                    state.products.sort((a, b) => (getDiscountedPrice(a) - getDiscountedPrice(b)))
                    break;
                case 'sort-by-price-desc':
                    state.products.sort((a, b) => (getDiscountedPrice(b) - getDiscountedPrice(a)))
                    break;
                case 'sort-by-rating':
                    state.products.sort((a, b) => b.rating - a.rating)
                    break;
                default:
                    break;
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProductsAsync.pending, (state) => {
            state.isLoading = true 
        })
        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload
            state.brands = getBrandList(action.payload)
            state.categories = getCategoryList(action.payload)
        })
        .addCase(fetchAllProductsAsync.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
        //----------------------------------------------------------------
        .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
            state.isLoading = true 
        })
        .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload
        })
        .addCase(fetchAllProductsByFiltersAsync.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})

export const { sortProducts } = productSlice.actions