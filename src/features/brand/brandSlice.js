import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandServices from "./brandService";


const initialState = {
    brands: [],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}

export const getBrands = createAsyncThunk("admin/brands", async (thunkApi) =>{
    try {
        return await brandServices.getBrands();
    } catch (error) {
        const serializableError = {
            message: error.response?.data?.message || error.message,
            status: error.response?.status
        }

        return thunkApi.rejectWithValue(serializableError);
    }
});


export const brandSlice = createSlice({
    name:"brand",
    initialState,
    reducers:[],
    extraReducers: (builder) => {
        builder.addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBrands.fulfilled, (state, action)=>{
            state.isSuccess= true;
            state.isLoading= false;
            state.isError= false;
            state.brands = action.payload;
        }).addCase(getBrands.rejected, (state, action)=>{
            state.isSuccess= false;
            state.isLoading= false;
            state.isError= true;
            state.message=action.payload?.message;
        });
    }
}
);

export default brandSlice.reducer;