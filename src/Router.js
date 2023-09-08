import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './Layout/Layout';
import Login from './Views/Login/Login';
import Users from './Views/Users/Users';
import SingleUser from './Views/SingleUser/SingleUser';
import ProductList from './Views/ProductList/ProductList';
import AddProduct from './Views/AddProduct/addProduct';


const Router = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        {/* OUTSIDE LAYOUT */}
        <Route exact path="/" element={<Login/>}/>

        {/* INSIDE LAYOUT */}
        <Route path="/admin" element={<Layout/>}>
          <Route index element={<Users/>}/>
          <Route exact path="user/:id" element={<SingleUser/>}/>
          <Route exact path="productList" element={<ProductList/>}/>
          <Route exact path="addProduct" element={<AddProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
   );
}
 
export default Router;