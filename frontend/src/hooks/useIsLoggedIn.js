import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUserPropertiesQuery } from "../api/UserApi";
import { useLocation } from "react-router-dom";
import { setLogin, setToken } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

const useIsLoggedIn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = useGetUserPropertiesQuery();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isLoading && !isError && data) {
      console.log(data);
        dispatch(setLogin(true));
        dispatch(setToken(localStorage.getItem("token")));
        dispatch(setCartCount(data.cartCount));
        dispatch(setWishlistCount(data.wishlistCount));
      }
  }, [data, dispatch, isError, isLoading, navigateTo]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  return isLoading;
};

export default useIsLoggedIn;
