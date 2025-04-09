import { Toaster } from "react-hot-toast";
import { config, Path } from "config";
import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { HomePage, Login, NotFound } from "pages";
import { PrivateRoute, PublicRoute } from "routes/guards";
import { DashboardLayout } from "layouts";

interface AppRouterInterface {}

const AppRouter: React.FC<AppRouterInterface> = () => {
  useEffect(() => {
    console.log("config environment", config);
  }, []);

  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route element={<PublicRoute />}>
          <Route path={Path.Login} element={<Login />} />
        </Route>

        {/* Private Route */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={Path.App} element={<HomePage />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* toaster container for toast messages */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AppRouter;
