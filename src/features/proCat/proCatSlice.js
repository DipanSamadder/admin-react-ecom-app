import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import proCatService from "./proCatService";

const initialState ={
    pcategory: [],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
};

export const getProCate = createAsyncThunk("admin/pcat", async (thunkApi)=>{
    try {
        return await proCatService.getProCates();
    } catch (error) {

        const senitizeError = {
            message: error.response?.data?.message || error.message,
            status: error.response?.status
        }
        return thunkApi.rejectWithValue(senitizeError);
        
    }
})


export const proCatSlice = createSlice({
    name: "pcategory",
    initialState,
    reducers:[],
    extraReducers:(builder)=>{
        builder.addCase(getProCate.pending, (state)=>{
            state.isLoading =true
        }).addCase(getProCate.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.isSuccess= true;
            state.isError= false;
            state.data= action.payload;
        }).addCase(getProCate.rejected, (state, action)=>{
            state.isLoading= false;
            state.isSuccess= false;
            state.isError= true;
            state.data= [];
            state.message = action.payload?.message
        });

    }
});


export default proCatSlice.reducer;