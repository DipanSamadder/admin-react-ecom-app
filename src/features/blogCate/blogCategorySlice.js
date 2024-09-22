import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import blogCateService  from './blogCategoryService';

const initialState = {
    bCategory: [],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:"",
}

export const blogCategory = createAsyncThunk("admin/blogCate", async (thunkApi) => {
    try {
        return await blogCateService.getBlogCate();
    } catch (error) {
        const senitizerError = {
            message: error.response?.data.messaeg ||error.messaeg,
            status: error.response?.status
        }

        return thunkApi.rejectWithValue(senitizerError);
    }
});

export const blogCategorySlice = createSlice({
    name:"bCategory",
    initialState,
    reducers:[],
    extraReducers:(builder) =>{
        builder.addCase(blogCategory.pending, (state)=>{
            state.isLoading =true
        }).addCase(blogCategory.fulfilled, (state, action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.data=action.payload;
        }).addCase(blogCategory.rejected, (state, action)=>{
            state.isLoading=false;
            state.isSuccess=false;
            state.isError=true;
            state.message = action.payload?.messaeg;
        });
    }
});


export default blogCategorySlice.reducer;