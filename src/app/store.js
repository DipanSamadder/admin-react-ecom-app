import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import proCatReducer  from "../features/proCat/proCatSlice";
import blogCategoryReducer from "../features/blogCate/blogCategorySlice";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer, 
        customer:customerReducer, 
        product:productReducer, 
        brand:brandReducer, 
        pcat:proCatReducer, 
        bcat:blogCategoryReducer,
        color:colorReducer,
        blog: blogReducer,
        order: orderReducer,
    },
});