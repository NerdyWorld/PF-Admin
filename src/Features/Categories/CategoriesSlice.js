import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesService } from "./CategoriesService";

const initialState = {
  categories: [],
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false
};

export const createNewCategory = createAsyncThunk(
  "create-new-category",
  async (category, thunkAPI) => {
    try {
      return await categoriesService.createCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
            console.log(action.payload)
          })
          .addCase(deleteCategory.fulfilled, (state, action) => {
            // Cuando se realiza con éxito la petición
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "Delete category success";
            
            // Filtrar las categorías según el ID eliminado
            state.categories = state.categories.filter(category => category.id !== action.payload.data);
          })
          
          .addCase(deleteCategory.rejected, (state, action)=>{
            // Cuando se realiza con exito la peticion
            console.log(action.error)
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = `Delete category error: ${action.error.message}`
          })


          // CREATE NEW CATEGORY
          .addCase(createNewCategory.pending, (state) => {
            state.isLoading = true;
            state.message = "Creating Category";
          })
          .addCase(createNewCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "Create Category Success";
            state.categories.push(action.payload.data); // Agregar la nueva categoría al estado
          })
          .addCase(createNewCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "Create Category Error";
      });

  }
})

