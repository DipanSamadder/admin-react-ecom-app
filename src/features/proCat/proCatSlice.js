import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import proCatService from "./proCatService";

const initialState = {
  pcategory: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getProCate = createAsyncThunk("admin/pcat", async (thunkApi) => {
  try {
    return await proCatService.getProCates();
  } catch (error) {
    const senitizeError = {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
    return thunkApi.rejectWithValue(senitizeError);
  }
});

export const createProCate = createAsyncThunk(
  "admin/add-product-cat",
  async (payload, thunkApi) => {
    try {
      return await proCatService.createProCates(payload);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

export const getACate = createAsyncThunk(
  "admin/get-a-pcat",
  async (id, thunkApi) => {
    try {
      return await proCatService.getACategory(id);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

export const updateProCate = createAsyncThunk(
  "admin/update-pcat",
  async (payload, thunkApi) => {
    try {
      return await proCatService.updateProCates(payload);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

export const proCatSlice = createSlice({
  name: "pcategory",
  initialState,
  reducers: {
    resetProCateState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.createProCateData = "";
      state.updateProCateData = "";
      state.editProCateData = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProCate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProCate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getProCate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.data = [];
        state.message = action.payload?.message;
      });

    //for add
    builder
      .addCase(createProCate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProCate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createProCateData = action.payload;
        state.message = action.payload?.message;
      })
      .addCase(createProCate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.data = [];
        state.message = action.payload?.message;
      });

    //for get a Category slice
    builder
      .addCase(getACate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.editProCateData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(getACate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.data = [];
        state.message = action.payload?.message;
      });

    //for update Category slice
    builder
      .addCase(updateProCate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProCate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updateProCateData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(updateProCate.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.data = [];
        state.message = action.payload?.message;
      });
  },
});

export const { resetProCateState } = proCatSlice.actions;
export default proCatSlice.reducer;
