import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { colorsService } from "./ColorsService";

const initialState = {
  colors: [],
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

export const getAllColors = createAsyncThunk(
  "get-all-colors",
  async (thunkAPI) => {
    try {
      return await colorsService.getAllColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "delete-color",
  async (data, thunkAPI) => {
    try {
      return await colorsService.deleteColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createColor = createAsyncThunk(
  "create-color",
  async (data, thunkAPI) => {
    try {
      return await colorsService.createColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL COLORS
      .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting Colors";
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Get Colors success";
        state.colors = action.payload.data;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Get Colors error";
        state.colors = [];
      })

      // DELETE COLOR
      .addCase(deleteColor.pending, (state, action) => {
        state.isLoading = true;
        state.message = `Deleting color with ID: ${action.meta.arg}`;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Delete color success";
        state.colors = state.colors.filter(
          (color) => color.id !== action.meta.arg
        );
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Delete color error";
        state.colors = [];
      })
      // CREATE COLOR
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating Color";
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Create Color success";
        state.colors = [...state.colors, action.payload.data];
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Create Color error";
      });
  },
});

export default colorsSlice.reducer;
