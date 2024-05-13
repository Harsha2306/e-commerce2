import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountIconClicked: false,
};

export const accountIconSlice = createSlice({
  name: "accountIconSlice",
  initialState,
  reducers: {
    toggle: (state) => {
      state.accountIconClicked = !state.accountIconClicked;
    },
  },
});

export const { toggle } = accountIconSlice.actions;

export default accountIconSlice.reducer;
