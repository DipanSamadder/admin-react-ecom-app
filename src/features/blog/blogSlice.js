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

export const getABlog = createAsyncThunk(
  "admin/get-a-blogs",
  async (payload, thunkAPI) => {
    try {
      return await blogServices.getABlog(payload);
    } catch (error) {
      const sanitizerError = {
        message: error.response?.data?.error || error.message,
        status: error.response?.status,
      };
      return thunkAPI.rejectWithValue(sanitizerError);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "admin/update-blogs",
  async (payload, thunkAPI) => {
    try {
      return await blogServices.updateBlog(payload);
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
      state.EditBlogData = "";
      state.UpdateBlogData = "";
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
        state.data = action.payload?.data;
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
        state.createBlogData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(createBlogNew.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      });

    //Edit
    builder
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.EditBlogData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      });

    //Edit
    builder
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.UpdateBlogData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message;
      });
  },
});

export const { resetBlogData } = blogSlice.actions;
export default blogSlice.reducer;
