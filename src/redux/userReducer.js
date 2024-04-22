import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        isError: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailed: (state, action) => {
            state.isFetching = false;
            state.isError = true;
        }
    },
});

export const { loginStart, loginSuccess, loginFailed } = userSlice.actions;
export default userSlice.reducer;
