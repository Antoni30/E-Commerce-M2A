import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function ProtectedRout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRout;