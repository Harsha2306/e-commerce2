import { configureStore } from "@reduxjs/toolkit";
import accountListReducer from "./AccountIconSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../api/AuthApi";
import { adminApi } from "../api/AdminApi";
import { userApi } from "../api/UserApi";
import tokenSliceReducer from "./TokenSlice";

export const store = configureStore({
  reducer: {
    accountList: accountListReducer,
    token: tokenSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(adminApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);
