/**
 * AuthLayout
 * * AuthLayout is for protected routes
 * @param AuthLayoutProps is interface for parameters
 */
import { Box } from "@mui/material";
import { Path } from "config";
import { getStorage, removeStorage, setStorage } from "hooks";
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCAL_STORAGE, decodeJWT } from "utils";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  //   setStorage(
  //     LOCAL_STORAGE.AUTH,
  //     "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiU3VwZXIgQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE3MTg0NDE4MDYsImlhdCI6MTcxODM1NTQwNiwiTmFtZSI6IkRlZXAgQmFnIn0.36FWiWSpGV95Rl_w4NHIVgAPfqszpn3AbLlzerHm-2k"
  //   );

  useEffect(() => {
    const auth: {
      [key: string]: any;
    } | null = decodeJWT(getStorage(LOCAL_STORAGE.AUTH));

    if (auth?.isExpired || !auth) {
      removeStorage(LOCAL_STORAGE.AUTH);
      navigate(Path.Login);
    } else if (auth?.isExpired === false) {
      setIsLoggedIn(true);
      console.log("decoded token", auth);
      if (pathname.match(Path.Login) || pathname === Path.HomePage) {
        navigate(Path.App);
      }
    }
  }, []);

  return <Box>{children}</Box>;
};
export default AuthLayout;
