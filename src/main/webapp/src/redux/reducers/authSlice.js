import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		user: null,
	},
	reducers: {
		loginSuccess(state) {
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
