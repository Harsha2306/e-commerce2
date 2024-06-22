import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useIsAdminLoggedIn = () => {
  const navigateTo = useNavigate();
  const isAdmin = useSelector((state) => state.token.isAdmin);
  if (!isAdmin) navigateTo("/admin/login");
};

export default useIsAdminLoggedIn;
