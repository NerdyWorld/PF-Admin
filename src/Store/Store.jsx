import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../Features/Users/userSlice";
import { productSlice } from "../Features/Products/productSlice";
import { categoriesSlice } from "../Features/Categories/CategoriesSlice";
import colorsSlice from "../Features/Colors/ColorsSlice";
import { ordersSlice } from "../Features/Orders/ordersSlice";
import { brandSlice } from "../Features/Brands/brandsSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    products: productSlice.reducer,
    categories: categoriesSlice.reducer,
    colors: colorsSlice,
    orders: ordersSlice.reducer,
    brands: brandSlice.reducer,
  },
});
