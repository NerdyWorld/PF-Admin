import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";

const initialState = {
  products: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
};


export const getAllProducts = createAsyncThunk("get-all-products", async(thunkAPI)=>{
  try{
    return await productService.getAllProducts();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteProduct = createAsyncThunk("delete-product", async(data, thunkAPI)=>{
  try{
    return await productService.deleteProduct(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});


export const createProduct = createAsyncThunk("create-product", async(data, thunkAPI)=>{
  try{
    return await productService.createProduct(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});



export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
            
            // DELETE PRODUCT
            .addCase(deleteProduct.pending, (state, action)=>{
              state.isLoading = true;
              state.message = `Deleting product ${action.meta.arg.productId}`;
            })
            .addCase(deleteProduct.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Delete Product Success";
              state.products = state.products.filter(product => product.id !== action.payload.data);
            })
            .addCase(deleteProduct.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Delete Product Error";
            })

            // CREATE PRODUCT
            .addCase(createProduct.pending, (state, action)=>{
              state.isLoading = true;
              state.message = `Creating product`;
            })
            .addCase(createProduct.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Creating Product Success";
              state.products = [...state.products, action.payload.data];
            })
            .addCase(createProduct.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Creating Product Error";
            })


            // GET ALL PRODUCTS
            .addCase(getAllProducts.pending, (state, action)=>{
              state.isLoading = true;
              state.message = `Getting all products`;
            })
            .addCase(getAllProducts.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Get Products Success";
              state.products = action.payload.data;
            })
            .addCase(getAllProducts.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Get Products Error";
            })
  }
})