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

export const getAColor = createAsyncThunk(
  "admin/get-a-color",
  async (id, thunkApi) => {
    try {
      return await colorService.getAColor(id);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

export const updateColor = createAsyncThunk(
  "admin/update-color",
  async (payload, thunkApi) => {
    try {
      return await colorService.updateColor(payload);
    } catch (error) {
      const senitizeError = {
        message: error.response?.data.message || error.message,
        status: error.response?.status,
      };
      return thunkApi.rejectWithValue(senitizeError);
    }
  }
);

export const DeleteColor = createAsyncThunk(
  "admin/delete-color",
  async (id, thunkApi) => {
    try {
      return await colorService.deleteColor(id);
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
      state.EditColorData = "";
      state.DeleteColorData = "";
      state.UpdateColorData = "";
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
        state.data = action.payload?.data;
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
        state.createColorData = action.payload?.data;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.message || "Error adding color";
      });

    //for get a color
    builder
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message;
        state.EditColorData = action.payload?.data;
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.message || "Error adding color";
      });

    //for update color
    builder
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message;
        state.UpdateColorData = action.payload?.data;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.message || "Error adding color";
      });

    //for update color
    builder
      .addCase(DeleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message;
        state.DeleteColorData = action.payload?.data;
      })
      .addCase(DeleteColor.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload?.message || "Error adding color";
      });
  },
});
export const { resetColorData } = colorSlice.actions;
export default colorSlice.reducer;
