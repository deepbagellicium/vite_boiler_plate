import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./redux/hook";
import MainRoutes from "./MainRouter";

export default function AppRouter() {
  const dispatch = useAppDispatch();

  return (
    <>
      <MainRoutes />
      {/* toaster container for toast messages */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
