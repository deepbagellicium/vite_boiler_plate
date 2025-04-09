import { Path } from "config";
import { useAuth } from "contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={Path.App} /> : <Outlet />;
};

export default PublicRoute;
