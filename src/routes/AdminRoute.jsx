import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user?.token)
    return <Navigate to="/login" />;

  if (user.role !== "Admin")
    return <Navigate to="/" />;

  return children;
}

export default AdminRoute;