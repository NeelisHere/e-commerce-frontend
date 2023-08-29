import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchProducts } from "./productListAPI"

const initialState = {
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

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProductsAsync.pending, (state) => {
            state.isLoading = true 
        })
        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload
        })
        .addCase(fetchAllProductsAsync.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})
