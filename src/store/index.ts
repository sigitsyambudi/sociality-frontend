import { configureStore, type UnknownAction } from "@reduxjs/toolkit";
import {
  authReducer,
  type AuthState,
} from "@/features/auth/auth-slice";

export type RootState = {
  auth: AuthState;
};

function rootReducer(
  state: RootState | undefined,
  action: UnknownAction,
): RootState {
  const auth = authReducer(state?.auth, action);

  if (state && auth === state.auth) {
    return state;
  }

  return { auth };
}

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
