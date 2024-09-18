import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState ={
    customers:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

// Call Servece 
export const getAllUser = createAsyncThunk(
    "customer/get-users",
    async (thunkAPI) => {
      try {
        return await customerService.getUsers();
      } catch (error) {
        
        const serializableError = {
          message: error.response?.data?.message || error.message,
          status: error.response?.status,
        };

        return thunkAPI.rejectWithValue(serializableError);
      }
    }
  );
  


export const customerSlice = createSlice({
    name:"customers",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.customers = action.payload;
            state.message=""
        }).addCase(getAllUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.customers = null;
            state.message = action.payload?.message || "User loading failed";
        })
    }
}); 

export default customerSlice.reducer;