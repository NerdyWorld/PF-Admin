import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userService } from "./userService";

const initialState = {
  users: [],
  user: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
};


export const getAllUsers = createAsyncThunk("get-all-users", async(thunkAPI)=>{
  try{
    return await userService.getAllUsers();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});


export const getUser = createAsyncThunk("get-users", async(data, thunkAPI)=>{
  try{
    return await userService.getUser(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});


export const updateUser = createAsyncThunk("update-user", async(data, thunkAPI)=>{
  try{
    return await userService.updateUser(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});


export const deleteUser = createAsyncThunk("delete-user", async(data, thunkAPI)=>{
  try{
    return await userService.deleteUser(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});



export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
            // GET ALL USERS
            .addCase(getAllUsers.pending, (state)=>{
              state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Get Users Success";
              state.users = action.payload.data || [];
            })
            .addCase(getAllUsers.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Get Users Error";
              state.users = [];
            })

            // GET USER
            .addCase(getUser.pending, (state)=>{
              state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Get User Success";
              state.user = action.payload.data;
            })
            .addCase(getUser.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Get User Error";
              state.user = {};
            })

            // UPDATE USER
            .addCase(updateUser.pending, (state, action)=>{
              state.isLoading = true;
              state.message = action.meta.arg.action;
            })
            .addCase(updateUser.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Update User Success";
              state.users = action.payload.allData;
              state.user = action.payload.data;
            })
            .addCase(updateUser.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Update User Error";
            })


            // DELETE USER
            .addCase(deleteUser.pending, (state, action)=>{
              state.isLoading = true;
              state.message = action.meta.arg.userId;
            })
            .addCase(deleteUser.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Delete User Success";
              state.users = state.users.filter(user => user.id !== action.payload.data);
            })
            .addCase(deleteUser.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Delete User Error";
            })
  }
})