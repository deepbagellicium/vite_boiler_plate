import { Toaster } from "react-hot-toast";
import MainRoutes from "MainRouter";
import { config } from "config";

interface AppRouterInterface {}

const AppRouter: React.FC<AppRouterInterface> = () => {
  console.log("config environment", config);
  return (
    <>
      <MainRoutes />
      {/* toaster container for toast messages */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AppRouter;
