<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../Features/Users/userSlice";
import { productSlice } from "../Features/Products/productSlice";
import { categoriesSlice } from "../Features/Categories/CategoriesSlice";
import colorsSlice from "../Features/Colors/ColorsSlice";
=======
import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../Features/Users/userSlice'
import { productSlice } from '../Features/Products/productSlice'
import { categoriesSlice } from '../Features/Categories/CategoriesSlice'
import { ordersSlice } from '../Features/Orders/ordersSlice'
>>>>>>> 4235b45c1a6e15b9735f6988c3294909719332f1

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    categories: categoriesSlice.reducer,
<<<<<<< HEAD
    colors: colorsSlice,
=======
    orders: ordersSlice.reducer
>>>>>>> 4235b45c1a6e15b9735f6988c3294909719332f1
  },
});
