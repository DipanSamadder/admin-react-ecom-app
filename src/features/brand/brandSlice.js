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

// Async thunk for fetching brands
export const getABrand = createAsyncThunk(
  "admin/get-brand",
  async (payload, thunkApi) => {
    try {
      return await brandServices.getABrand(payload); // Expecting this function to return an array of brands
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

// Async thunk for adding a brand
export const updateBrand = createAsyncThunk(
  "admin/update-brand",
  async (data, thunkApi) => {
    try {
      return await brandServices.updateBrand(data); // Expecting this function to return the created brand
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(serializableError);
    }
  }
);

// Async thunk for fetching brands
export const deleteBrand = createAsyncThunk(
  "admin/delete-brand",
  async (id, thunkApi) => {
    try {
      return await brandServices.deleteBrand(id); // Expecting this function to return an array of brands
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
  name: "brands",
  initialState,
  reducers: {
    resetbrandState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.createBrandData = "";
      state.updatedData = "";
      state.deleteBrandData = "";
      state.editData = "";
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
        state.message = action.payload?.message;
        state.data = action.payload?.data;
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
        state.createBrandData = action.payload?.data; // Add the newly created brand to the list
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Error adding brand";
      });

    // get A Brand async thunks
    builder
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload?.message;
        state.editData = action.payload?.data;
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Error show brand";
      });

    // get A Brand async thunks
    builder
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload?.message;
        state.updatedData = action.payload?.data;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Error update brand";
      });

    // delete A Brand async thunks
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload?.message;
        state.deleteBrandData = action.payload?.data;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Error update brand";
      });
  },
});
export const { resetbrandState } = brandSlice.actions;
export default brandSlice.reducer;
