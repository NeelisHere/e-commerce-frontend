import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProducts } from "./productListAPI"

const initialState = {
    brands: [],
    categories: [],
    products: [],
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

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

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
    }
})
