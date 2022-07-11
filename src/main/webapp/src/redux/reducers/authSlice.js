import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		jwt: null,
	},
	reducers: {
		loginSuccess(state, action) {
			state.jwt = action.payload;
			state.isLoggedIn = true;
		},
		loginFailure(state) {
			state.isLoggedIn = false;
			state.user = null;
		},
		logout(state) {
			state.isLoggedIn = false;
			state.user = null;
		}
	}
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
