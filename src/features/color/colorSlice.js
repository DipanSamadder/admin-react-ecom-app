import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
  colors: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getColorList = createAsyncThunk(
  "admin/color",
  async (thunkApi) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      const senitizeError = {
        message: error.response?.data.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

export const createColor = createAsyncThunk(
  "admin/add-color",
  async (payload, thunkApi) => {
    try {
      return await colorService.createColor(payload);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    resetColorData: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.createColorData = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColorList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColorList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
        state.message = action.payload?.message;
      })
      .addCase(getColorList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.message || "Error adding color";
      });
    //for add
    builder
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message;
        state.createColorData = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.message || "Error adding color";
      });
  },
});
export const { resetColorData } = colorSlice.actions;
export default colorSlice.reducer;
