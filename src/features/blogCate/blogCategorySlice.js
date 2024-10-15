import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogCateService from "./blogCategoryService";

const initialState = {
  bCategory: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const blogCategory = createAsyncThunk(
  "admin/blogCate",
  async (thunkApi) => {
    try {
      return await blogCateService.getBlogCate();
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "admin/add-blog-cate",
  async (payload, thunkApi) => {
    try {
      return await blogCateService.createBlogCate(payload);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const getABlogCategory = createAsyncThunk(
  "admin/get-a-blog-cate",
  async (id, thunkApi) => {
    try {
      return await blogCateService.getABlogCate(id);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  "admin/update-blog-cate",
  async (payload, thunkApi) => {
    try {
      return await blogCateService.updateBlogCate(payload);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  "admin/delete-blog-cate",
  async (id, thunkApi) => {
    try {
      return await blogCateService.deleteBlogCate(id);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);
export const blogCategorySlice = createSlice({
  name: "bCategory",
  initialState,
  reducers: {
    resetBlogCate: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.createBlogCate = "";
      state.EditBlogCate = "";
      state.UpdateBlogCate = "";
      state.DeleteBlogCate = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(blogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload?.data;
      })
      .addCase(blogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.messaeg;
      });

    //for add category
    builder
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createBlogCate = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });

    //for Edit category
    builder
      .addCase(getABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.EditBlogCate = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(getABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });

    //for Update category
    builder
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.UpdateBlogCate = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });

    //for Delete category
    builder
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.DeleteBlogCate = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });
  },
});
export const { resetBlogCate } = blogCategorySlice.actions;
export default blogCategorySlice.reducer;
