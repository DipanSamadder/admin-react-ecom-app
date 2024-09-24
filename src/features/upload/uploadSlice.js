import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialState = {
  uploads: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const uploadFile = createAsyncThunk(
  "admin/upload",
  async (files, thunkApi) => {
    try {
      return await uploadService.addUpload(files);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data.message || error.meesage,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

export const deleteFile = createAsyncThunk(
  "admin/upload/delete",
  async (id, thunkApi) => {
    try {
      return await uploadService.deleteUpload(id);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data.message || error.meesage,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.meesage;
      })
      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Deletedata = action.payload;
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.meesage;
      });
  },
});

export default uploadSlice.reducer;
