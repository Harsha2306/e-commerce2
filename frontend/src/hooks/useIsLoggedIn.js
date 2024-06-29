import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserPropertiesQuery } from "../api/UserApi";
import { useLocation } from "react-router-dom";
import { setLogin, setToken } from "../redux-store/TokenSlice";
import { setCartCount, setWishlistCount } from "../redux-store/userSlice";
import { useDispatch } from "react-redux";

const useIsLoggedIn = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { data, isLoading, isError, refetch } = useGetUserPropertiesQuery();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (!isLoading && !isError && data && localStorage.getItem("token")) {
      dispatch(setLogin(true));
      dispatch(setToken(localStorage.getItem("token")));
      dispatch(setCartCount(data.cartCount));
      dispatch(setWishlistCount(data.wishlistCount));
    } else if (!isLoading && isError) {
      if (isFirstLoad) {
        dispatch(setLogin(false));
        dispatch(setToken(null));
        dispatch(setCartCount(0));
        dispatch(setWishlistCount(0));
        // navigateTo("/login");
        setIsFirstLoad(false);
      }
    }
  }, [data, dispatch, isError, isLoading, navigateTo, isFirstLoad]);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  return isLoading;
};

export default useIsLoggedIn;
