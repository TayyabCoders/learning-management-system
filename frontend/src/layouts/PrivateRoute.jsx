import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateRoute = () => {
  const loggedIn = useAuthStore((state) => state.isLoggedIn)(); // ✅ Correct usage

  return loggedIn ? <Outlet /> : <Navigate to="/login/" />;
};

export default PrivateRoute;
