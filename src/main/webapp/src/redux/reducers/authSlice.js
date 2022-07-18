import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedIn: false,
		user: null,
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
		},
		updateUser(state, action) {
			state.user = action.payload;
		}
	}
});

export const { loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
