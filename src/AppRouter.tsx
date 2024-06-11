import { Toaster } from "react-hot-toast";
import MainRoutes from "./MainRouter";

interface AppRouterInterface {}

const AppRouter: React.FC<AppRouterInterface> = () => {
  return (
    <>
      <MainRoutes />
      {/* toaster container for toast messages */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AppRouter;
