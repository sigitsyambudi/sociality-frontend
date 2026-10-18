import { createSlice } from "@reduxjs/toolkit";

export type AuthStatus = "authenticated" | "anonymous" | "unknown";

export type AuthState = {
  status: AuthStatus;
};

const initialState: AuthState = {
  status: "unknown",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    markAuthenticated(state) {
      state.status = "authenticated";
    },
    markAnonymous(state) {
      state.status = "anonymous";
    },
    resetAuth() {
      return initialState;
    },
  },
});

export const { markAnonymous, markAuthenticated, resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
