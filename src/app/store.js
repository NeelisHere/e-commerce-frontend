import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from '../features/product-list/productListSlice.js'
export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});
