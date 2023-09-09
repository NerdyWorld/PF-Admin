
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesService } from "./CategoriesService";

const initialState = {
  categories: [],
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false
};


// Esta funcion llama a la funcion que creaste en el service, cla, es para generar capas. Esta funcion la llamas con un dispatch si.

export const getAllCategories = createAsyncThunk("get-all-categories", async(thunkAPI)=>{
  try{
    return await categoriesService.getAllCategories();
  }catch(error){
    return thunkAPI.rejectWithValue(error)
  }
});


export const deleteCategory = createAsyncThunk("delete-category", async(data, thunkAPI)=>{
  try{
    return await categoriesService.deleteCategory(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error)
  }
});




export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
          // GET ALL CATEGORIES
          .addCase(getAllCategories.pending, (state)=>{
            state.isLoading = true;
            state.message = "Getting Categories"
            // Claaaaro, segun el mensaje renderizas el loader 
          })
          .addCase(getAllCategories.fulfilled, (state, action)=>{
            // Cuando se realiza con exito la peticion
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "Get Categories success";
            state.categories = action.payload.data
          })
          .addCase(getAllCategories.rejected, (state, action)=>{
            // Cuando se realiza con exito la peticion
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "Get Categories error";
            state.categories = []
          })


          // DELETE CATEGORY
          .addCase(deleteCategory.pending, (state, action)=>{
            state.isLoading = true;
            state.message = `Deleting ${action.payload.arg.meta.categoryId}`

          })
          .addCase(deleteCategory.fulfilled, (state, action)=>{
            // Cuando se realiza con exito la peticion
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "Delete category success";
            state.categories = state.categories.filter(category => category.id !== action.payload.data)
            // El back devuelve el id de la categoria en el payload.data
          })
          .addCase(deleteCategory.rejected, (state, action)=>{
            // Cuando se realiza con exito la peticion
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "Delete category error";
            state.categories = []
          })

  }
})

