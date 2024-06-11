import { useRoutes } from "react-router-dom";
import { Path } from "./config";
import { LoginLayout, PrivateLayout } from "./layouts";
import { HomePage, Login, NotFound } from "./pages";

export default function MainRoutes() {
  let element = useRoutes([
    {
      path: Path.Login,
      element: <LoginLayout />,
      children: [{ path: Path.HomePage, element: <Login /> }],
    },
    {
      path: Path.HomePage,
      element: <PrivateLayout />,
      children: [{ path: Path.App, element: <HomePage /> }],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return element;
}
