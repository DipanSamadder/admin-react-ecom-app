import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import couponService from "./couponService";

const initialState = {
  coupons: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getCoupons = createAsyncThunk("admin/coupon", async (thunkApi) => {
  try {
    return await couponService.getCoupon();
  } catch (error) {
    const senitizerError = {
      message: error.response?.data.messaeg || error.messaeg,
      status: error.response?.status,
    };

    return thunkApi.rejectWithValue(senitizerError);
  }
});

export const createCoupons = createAsyncThunk(
  "admin/add-coupon",
  async (payload, thunkApi) => {
    try {
      console.log(payload);

      return await couponService.createCoupon(payload);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const getACoupons = createAsyncThunk(
  "admin/get-a-coupon",
  async (payload, thunkApi) => {
    try {
      return await couponService.getACoupon(payload);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const updateCoupons = createAsyncThunk(
  "admin/update-coupon",
  async (payload, thunkApi) => {
    try {
      return await couponService.updateCoupon(payload);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const deleteCoupons = createAsyncThunk(
  "admin/delete-coupon",
  async (id, thunkApi) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      const senitizerError = {
        message: error.response?.data.messaeg || error.messaeg,
        status: error.response?.status,
      };

      return thunkApi.rejectWithValue(senitizerError);
    }
  }
);

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCoupon: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.createCouponData = "";
      state.EditCouponData = "";
      state.UpdateCouponData = "";
      state.deleteCouponData = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload?.data;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.messaeg;
      });

    //for add category
    builder
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createCouponData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });

    //for get category
    builder
      .addCase(getACoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getACoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.EditCouponData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(getACoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });

    //for update category
    builder
      .addCase(updateCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.UpdateCouponData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(updateCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });

    //for Delete category
    builder
      .addCase(deleteCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleteCouponData = action.payload?.data;
        state.message = action.payload?.message;
      })
      .addCase(deleteCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });
  },
});
export const { resetCoupon } = couponSlice.actions;
export default couponSlice.reducer;
