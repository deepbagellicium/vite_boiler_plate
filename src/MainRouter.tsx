import { useRoutes } from "react-router-dom";
import { Path } from "config";
import { HomePage, Login, NotFound } from "pages";
import { PrivateRoute, PublicRoute } from "guards";

interface MainRouterInterface {}

const MainRoutes: React.FC<MainRouterInterface> = () => {
  const element = useRoutes([
    {
      path: Path.Login,
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },
    {
      path: Path.App,
      element: <PrivateRoute />,
      children: [{ path: "", element: <HomePage /> }],
    },
    { path: "*", element: <NotFound /> },
  ]);
  return element;
};

export default MainRoutes;
