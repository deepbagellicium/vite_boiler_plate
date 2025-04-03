import { Path } from "config";
import { useAuth } from "contexts/AuthContext";
import { DashboardLayout } from "layouts";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to={Path.Login} />
  );
};

export default PrivateRoute;
