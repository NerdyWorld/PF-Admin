import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Features/Users/userSlice'
import { productSlice } from '../Features/Products/productSlice'
import { brandSlice } from '../Features/Brands/brandsSlice'
export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    brands: brandSlice.reducer,
  },
})