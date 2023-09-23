import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { userService } from "./userService";

const initialState = {
  userx: null,
  users: [],
  user: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, thunkAPI) => {
    try {
      return await userService.loginUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const googleLoginSlice = createAsyncThunk(
  "googleLogin",
  async (data, thunkAPI) => {
    try {
      return await userService.googleLogin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const githubAuth = createAsyncThunk(
  "githubAuth",
  async (data, thunkAPI) => {
    try {
      return await userService.githubAuth(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "get-all-users",
  async (thunkAPI) => {
    try {
      return await userService.getAllUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk("get-users", async (data, thunkAPI) => {
  try {
    return await userService.getUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk(
  "update-user",
  async (data, thunkAPI) => {
    try {
      return await userService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "delete-user",
  async (data, thunkAPI) => {
    try {
      return await userService.deleteUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearUserMessage = createAction("create-user-message");

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN USER

      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.message = "Logging in user";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.userx = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.userx = null;
      })
      // GOOGLE LOGIN
      .addCase(googleLoginSlice.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(googleLoginSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.userx = action.payload.data;
      })
      .addCase(googleLoginSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.userx = null;
      })
      //login github
      .addCase(githubAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(githubAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.userx = action.payload.data;
      })
      .addCase(githubAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.userx = null;
      })
      // GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Get Users Success";
        state.users = action.payload.data || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Get Users Error";
        state.users = [];
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Get User Success";
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Get User Error";
        state.user = {};
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.message = action.meta.arg.action;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Update User Success";
        state.users = action.payload.allData;
        state.user = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Update User Error";
      })
      // ACTIONS
      .addCase(clearUserMessage, (state) => {
        state.message = "";
      })
      // DELETE USER
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.message = action.meta.arg.userId;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Delete User Success";
        state.users = state.users.filter(
          (user) => user.id !== action.payload.data
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Delete User Error";
      });
  },
});
