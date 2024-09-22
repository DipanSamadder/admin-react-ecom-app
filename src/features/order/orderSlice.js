import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import orderServices from './orderService';


const initialState = {
    orders:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
}

export const getOrderList = createAsyncThunk("admin/orders", async (thunkAPI)=>{
    try {
        return await orderServices.getOrders();
    } catch (error) {
        const sanitizerError = {
            message:error.response?.data?.error || error.message,
            status:error.response?.status,
        }
        return thunkAPI.rejectWithValue(sanitizerError);
    }
});


const orderSlice  = createSlice({
    name:"orders",
    initialState,
    reducers:[],
    extraReducers:(builder) =>{
        builder.addCase(getOrderList.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getOrderList.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.data = action.payload;
        }).addCase(getOrderList.rejected, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.data = action.payload?.message;
        });
    }
});


export default orderSlice.reducer;