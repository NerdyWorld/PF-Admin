import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Features/Users/userSlice'
import { productSlice } from '../Features/Products/productSlice'
import { categoriesSlice } from '../Features/Categories/CategoriesSlice'
import { ordersSlice } from '../Features/Orders/ordersSlice'

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    categories: categoriesSlice.reducer,
    orders: ordersSlice.reducer
  },
})