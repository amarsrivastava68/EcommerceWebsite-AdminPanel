import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {

    isAuthenticated : false , 
    isLoading : false , 
    user : null 
}
export const registerUser =  createAsyncThunk(
    '/auth/register' , 
    async (formData) => {
        const response  = await axios.post('http://localhost:5000/api/auth/register' , formData , {
            withCredentials  : true 
        })
        return response.data
    })

    export const loginUser =  createAsyncThunk(
        '/auth/login' , 
        async (formData) => {
            const response  = await axios.post('http://localhost:5000/api/auth/login' , formData , {
                withCredentials  : true 
            })
            return response.data
        })
        const authSlice = createSlice({
            name: "auth",
            initialState,
            reducers: {
              setUser: (state, action) => {
                state.user = action.payload; // Example usage of setUser
              },
            },
            extraReducers: (builder) => {
              builder
                .addCase(registerUser.pending, (state) => {
                  state.isLoading = true;
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                  state.isLoading = false;
                  state.user = null;
                  state.isAuthenticated = true;
                })
                .addCase(registerUser.rejected, (state) => {
                  state.isAuthenticated = false;
                  state.user = null;
                  state.isLoading = false;
                })
                .addCase(loginUser.pending, (state) => {
                  state.isLoading = true;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                  state.isLoading = false;
                  console.log(action.payload.user, 'see here . . .');
                  state.user = action.payload.success ? action.payload.user : null;
                  state.isAuthenticated = action.payload.success ? true : false;
                })
                .addCase(loginUser.rejected, (state) => {
                  state.isAuthenticated = false;
                  state.user = null;
                  state.isLoading = false;
                });
            },
          });
          

export const {setUser} = authSlice.actions 
export default authSlice.reducer
