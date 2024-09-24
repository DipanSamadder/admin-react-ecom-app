import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandServices from "./brandService";

// Initial state
const initialState = {
  brands: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Async thunk for fetching brands
export const getBrands = createAsyncThunk(
  "admin/brands",
  async (_, thunkApi) => {
    try {
      return await brandServices.getBrands(); // Expecting this function to return an array of brands
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(serializableError);
    }
  }
);

// Async thunk for adding a brand
export const addBrand = createAsyncThunk(
  "admin/add-brand",
  async (data, thunkApi) => {
    try {
      return await brandServices.addBrand(data); // Expecting this function to return the created brand
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(serializableError);
    }
  }
);

// Brand slice
export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetbrandState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.createBrandData = "";
    },
  },
  extraReducers: (builder) => {
    // getBrands async thunks
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Error fetching brands";
      });

    // addBrand async thunks
    builder
      .addCase(addBrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload?.message;
        state.createBrandData = action.payload; // Add the newly created brand to the list
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Error adding brand";
      });
  },
});
export const { resetbrandState } = brandSlice.actions;
export default brandSlice.reducer;
