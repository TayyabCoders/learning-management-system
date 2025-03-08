import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PublicRoute = () => {
  const loggedIn = useAuthStore((state) => state.isLoggedIn)(); // Check if user is logged in

  return loggedIn ? <Navigate to="/" /> : <Outlet />; // Redirect to home if logged in
};

export default PublicRoute;
