import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const Login = lazy(() => import("./Login"));
const NotFound = lazy(() => import("./NotFound"));

export { HomePage, Login, NotFound };
