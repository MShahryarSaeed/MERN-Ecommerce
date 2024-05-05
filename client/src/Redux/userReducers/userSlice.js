import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        signInStart: (state) => {
            state.currentUser = null,
                state.isLoading = true,
                state.error = null
        },

        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
                state.isLoading = false,
                state.error = null
        },

        signInFailure: (state, action) => {
            state.currentUser = null,
                state.isLoading = false,
                state.error = action.payload
        },

        signoutUserStart: (state) => {
            state.isLoading = true,
            state.error = null
        },

        signoutUserSuccess: (state) => {
            state.currentUser = null;
            state.isLoading = false; 
            state.error = null;
          },

        signoutUserFailure: (state,action) => {
            state.isLoading = false,
            state.error = action.payload
        }
    }
})

export const { signInStart, signInSuccess, signInFailure, signoutUserStart,signoutUserSuccess,signoutUserFailure } = userSlice.actions;
export default userSlice.reducer;