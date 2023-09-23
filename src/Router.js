import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Users from "./Views/Users/Users";
import SingleUser from "./Views/SingleUser/SingleUser";
import ProductList from "./Views/ProductList/ProductList";
import AddProduct from "./Views/AddProduct/addProduct";
import CategoriesList from "./Views/CategoriesList/CategoriesList";
import AddCategory from "./Views/AddCategorie/AddCategorie";
import ColorsList from "./Views/Colors/ColorsList/ColorsList";
import AddColor from "./Views/Colors/AddColor/AddColor";
import OrdersList from "./Views/Orders/Order";
import AddBrand from "./Views/AddBrand/addBrand";
import BrandList from "./Views/BrandList/BrandList";
import Landing from "./Views/Landing/Landing";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { useSelector } from "react-redux";

const Router = () => {
  const state = useSelector((state) => state);
  const auth = state.users.userx;

  return (
    <BrowserRouter>
      <Routes>
        {/* OUTSIDE LAYOUT */}
        <Route exact path="/" element={<Landing />} />

        {/* INSIDE LAYOUT */}
        <Route element={<ProtectedRoute canActivate={auth} />}>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Users />} />
            <Route exact path="user/:id" element={<SingleUser />} />
            <Route exact path="addColor" element={<AddColor />} />
            <Route exact path="productList" element={<ProductList />} />
            <Route exact path="categoriesList" element={<CategoriesList />} />
            <Route exact path="addCategory" element={<AddCategory />} />
            <Route exact path="OrdersList" element={<OrdersList />} />
            <Route exact path="colorsList" element={<ColorsList />} />
            <Route exact path="addProduct" element={<AddProduct />} />
            <Route exact path="addBrand" element={<AddBrand />} />
            <Route exact path="brandList" element={<BrandList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
