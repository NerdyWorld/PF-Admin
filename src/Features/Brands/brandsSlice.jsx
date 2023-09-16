import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { brandService } from "./brandsService";

const initialState = {
    brands: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ""
}

export const getAllBrands = createAsyncThunk(
    "get-all-brands", async(thunkAPI) =>{
        try {
            return await brandService.getAllBrands();
        }catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

export const deleteBrand = createAsyncThunk(
    "delete-brand", async(data, thunkAPI) =>{
        try {
            return await brandService.deleteBrand(data);
        }catch(error) {
            return thunkAPI.rejectWithValue(error);
        }
    });


export const createBrand = createAsyncThunk(
        "create-brand", async(data, thunkAPI) =>{
            try {
                return await brandService.createBrand(data);
            }catch(error) {
                return thunkAPI.rejectWithValue(error);
            }
        });

        export const brandSlice = createSlice({
            name: "brands",
            initialState,
            reducers: {},
            extraReducers: (builder)=>{
                builder

                //GET ALL BRANDS
                .addCase(getAllBrands.pending, (state, action)=>{
                    state.isLoading = true;
                    state.message = "Getting All Brands";
                })
                .addCase(getAllBrands.fulfilled, (state, action)=>{
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError= false;
                    state.message = "Getting Brands Success";
                    state.brands= action.payload.data;
                })
                .addCase(getAllBrands.rejected, (state, action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError= true;
                    state.message = "Getting Brands Error";
                    
                })


                //CREATE BRAND
                .addCase(createBrand.pending, (state, action)=>{
                    state.isLoading = true;
                    state.message = "Creating brand";
                })
                .addCase(createBrand.fulfilled, (state, action)=>{
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.message = "Creating Brand Success";
                    state.brands = [...state.brands, action.payload.data];
                  })
                .addCase(createBrand.rejected, (state, action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError= true;
                    state.message = "Creating Brand Error";
                    
                })

                //DELETE BRAND
                .addCase(deleteBrand.pending, (state, action)=>{
                    state.isLoading = true;
                    state.message = `Deleting brand ${action.meta.arg.brandId}`;;
                })
                .addCase(deleteBrand.fulfilled, (state, action)=>{
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.isError = false;
                    state.message = "Delete Brand Success";
                    state.brands = state.brands.filter(brand => brand.id !== action.payload.data);
                  })
                .addCase(deleteBrand.rejected, (state, action)=>{
                    state.isLoading = false;
                    state.isSuccess = false;
                    state.isError= true;
                    state.message = "Delete Brand Error";
                  })
            }
        })