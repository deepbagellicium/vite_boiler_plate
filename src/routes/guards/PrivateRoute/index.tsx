import { Path } from "config";
import { useAuth } from "contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to={Path.Login} />;
};

export default PrivateRoute;
