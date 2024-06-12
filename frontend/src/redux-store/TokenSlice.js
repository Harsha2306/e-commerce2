import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  isLoggedIn: false,
  isAdmin: false,
};

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setToken, setLogin, setIsAdmin } = tokenSlice.actions;

export default tokenSlice.reducer;
