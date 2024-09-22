import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import colorService from './colorService';


const initialState = {
    colors:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

export const getColorList = createAsyncThunk("admin/color", async (thunkApi)=>{
    try {
        return await colorService.getColors();
    } catch (error) {
        const senitizeError = {
            message: error.response?.data.message ||  error.meesage,
            status: error.response?.status
        }
        return thunkApi.rejectWithValue(senitizeError);
    }
});


const colorSlice = createSlice({
    name:'color',
    initialState,
    reducers:[],
    extraReducers:(builder) =>{
        builder.addCase(getColorList.pending, (state)=>{
            state.isLoading = true;
        }).addCase(getColorList.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.data = action.payload;
        }).addCase(getColorList.rejected, (state, action)=>{
            state.isError = true;
            state.isLoading= false;
            state.isSuccess = false;
            state.message = action.payload?.meesage;
      
        });
    }
});

export default colorSlice.reducer;