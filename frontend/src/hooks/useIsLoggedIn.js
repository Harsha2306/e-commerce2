import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useIsLoggedIn = () => {
  const isLoggedIn = useSelector((state) => state.token.isLoggedIn);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) navigateTo("/login");
  }, [isLoggedIn, navigateTo]);
};

export default useIsLoggedIn;
