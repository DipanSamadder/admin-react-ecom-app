import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";


const initialState = {
    products:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

export const getProducts = createAsyncThunk("admin/products", async (thunkAPI)=>{
    try {
        return await productService.getProducts();
    } catch (error) {
        const serializableError = {
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
        };

        return thunkAPI.rejectWithValue(serializableError);
    }
})

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading=true
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading=false;
            state.isError=false;
            state.message="";
            state.isSuccess=true;
            state.products= action.payload;


        }).addCase(getProducts.rejected, (state,action) =>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload?.message;
        } );
    }


});


export default productSlice.reducer;