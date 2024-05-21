import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  wishlistCount: 0,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setWishlistCount: (state, action) => {
      state.wishlistCount = action.payload;
    },
  },
});

export const { setCartCount, setWishlistCount } = userSlice.actions;

export default userSlice.reducer;
