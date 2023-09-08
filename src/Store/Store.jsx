import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Features/Users/userSlice'
import { productSlice } from '../Features/Products/productSlice'

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer
  },
})