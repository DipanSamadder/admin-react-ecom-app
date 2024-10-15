import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getProducts = createAsyncThunk(
  "admin/products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };

      return thunkAPI.rejectWithValue(serializableError);
    }
  }
);

export const addProducts = createAsyncThunk(
  "admin/add-products",
  async (data, thunkAPI) => {
    try {
      return await productService.addProduct(data);
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };

      return thunkAPI.rejectWithValue(serializableError);
    }
  }
);

export const getAProducts = createAsyncThunk(
  "admin/get-a-products",
  async (id, thunkAPI) => {
    try {
      return await productService.getAProduct(id);
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };

      return thunkAPI.rejectWithValue(serializableError);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "admin/update-products",
  async (payload, thunkAPI) => {
    try {
      return await productService.updateProduct(payload);
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };

      return thunkAPI.rejectWithValue(serializableError);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "admin/delete-products",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };

      return thunkAPI.rejectWithValue(serializableError);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.createProData = "";
      state.updateProData = "";
      state.editProData = "";
      state.deleteProData = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload?.message;
        state.isSuccess = true;
        state.products = action.payload?.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message;
      });

    //Add Product
    builder
      .addCase(addProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.createProducts = action.payload;
        state.message = action.payload?.message;
        state.isSuccess = true;
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message;
      });

    //Get A Product
    builder
      .addCase(getAProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.editProData = action.payload?.data;
        state.message = action.payload?.message;
        state.isSuccess = true;
      })
      .addCase(getAProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message;
      });

    //Update Product
    builder
      .addCase(updateProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.updateProData = action.payload?.data;
        state.message = action.payload?.message;
        state.isSuccess = true;
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message;
      });

    //Delete Product
    builder
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.deleteProData = action.payload?.data;
        state.message = action.payload?.message;
        state.isSuccess = true;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message;
      });
  },
});
export const { resetProState } = productSlice.actions;
export default productSlice.reducer;
