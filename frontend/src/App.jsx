import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import WomensProductsPage from "./pages/WomensProductsPage";
import MensProductsPage from "./pages/MensProductsPage";
import KidsProductsPage from "./pages/KidsProductsPage";
import WishlistPage from "./pages/WishlistPage";
import DashboardPage from "./pages/DashboardPage";
import EditPasswordPage from "./pages/EditPasswordPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/admin/HomePage";
import AddProductPage from "./pages/admin/AddProductPage";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import AdminNavBar from "./components/admin/AdminNavBar";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import PageNotFound from "./pages/PageNotFound";
import OrderDetails from "./pages/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminNavBar />,
    children: [
      { path: "/admin", element: <HomePage /> },
      { path: "/admin/add-product", element: <AddProductPage /> },
      { path: "/admin/login", element: <AdminLoginPage /> },
    ],
  },
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/products/men", element: <MensProductsPage /> },
      { path: "/products/women", element: <WomensProductsPage /> },
      { path: "/products/kids", element: <KidsProductsPage /> },
      { path: "/products/:productId", element: <ProductDetailsPage /> },
      { path: "/account", element: <DashboardPage /> },
      { path: "/account/edit-password", element: <EditPasswordPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/order-history", element: <OrdersPage /> },
      { path: "/forgotPassword", element: <ForgotPassword /> },
      { path: "/orderDetails/:orderId", element: <OrderDetails /> },
    ],
  },
  { path: "/reset/:token", element: <PasswordReset /> },
  { path: "*", element: <PageNotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
