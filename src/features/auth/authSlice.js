import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Define initial state
const getUserDataFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getUserDataFromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Call Login Server
export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      // Extract serializable error details
      console.log(error);
      
      const serializableError = {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
      };
      return thunkAPI.rejectWithValue(serializableError);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
         // Store the serializable error message
         state.message = action.payload?.message || "Login failed";
      });
  },
});

export default authSlice.reducer;
