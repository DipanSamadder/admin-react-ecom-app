import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/blog/blogSlice";
import blogCategoryReducer from "../features/blogCate/blogCategorySlice";
import brandReducer from "../features/brand/brandSlice";
import colorReducer from "../features/color/colorSlice";
import couponSlice from "../features/coupon/couponSlice";
import customerReducer from "../features/customers/customerSlice";
import orderReducer from "../features/order/orderSlice";
import proCatReducer from "../features/proCat/proCatSlice";
import productReducer from "../features/product/productSlice";
import uploadSlice from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pcat: proCatReducer,
    bcat: blogCategoryReducer,
    color: colorReducer,
    blog: blogReducer,
    order: orderReducer,
    upload: uploadSlice,
    coupon: couponSlice,
  },
});
