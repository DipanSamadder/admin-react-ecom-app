import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogServices from "./blogService";

const initialState = {
  blogs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getBlogList = createAsyncThunk("admin/blogs", async (thunkAPI) => {
  try {
    return await blogServices.getBlogs();
  } catch (error) {
    const sanitizerError = {
      message: error.response?.data?.error || error.message,
      status: error.response?.status,
    };
    return thunkAPI.rejectWithValue(sanitizerError);
  }
});

export const createBlogNew = createAsyncThunk(
  "admin/add-blogs",
  async (payload, thunkAPI) => {
    try {
      return await blogServices.createBlog(payload);
    } catch (error) {
      const sanitizerError = {
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
      };
      return thunkAPI.rejectWithValue(sanitizerError);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    resetBlogData: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.createBlogData = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getBlogList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.data = action.payload?.message;
      });

    //add
    builder
      .addCase(createBlogNew.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogNew.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createBlogData = action.payload;
        state.message = action.payload?.message;
      })
      .addCase(createBlogNew.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      });
  },
});

export const { resetBlogData } = blogSlice.actions;
export default blogSlice.reducer;
