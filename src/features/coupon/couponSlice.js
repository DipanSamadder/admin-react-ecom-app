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
export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCoupon: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.createCouponData = "";
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
        state.data = action.payload;
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
        state.createCouponData = action.payload;
        state.message = action.payload?.message;
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload?.message || "Sorry! Try again please";
      });
  },
});
export const { resetCoupon } = couponSlice.actions;
export default couponSlice.reducer;
