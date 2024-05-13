import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  isLoggedIn: false,
};

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setToken, setLogin } = tokenSlice.actions;

export default tokenSlice.reducer;
