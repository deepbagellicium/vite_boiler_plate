import { Toaster } from "react-hot-toast";
import MainRoutes from "MainRouter";
import { config } from "config";
import { useEffect } from "react";

interface AppRouterInterface {}

const AppRouter: React.FC<AppRouterInterface> = () => {
  useEffect(() => {
    console.log("config environment", config);
  }, []);
  return (
    <>
      <MainRoutes />
      {/* toaster container for toast messages */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AppRouter;
