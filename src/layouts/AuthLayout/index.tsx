import { Box } from "@mui/material";
import { MainLoading } from "components";
import { Path } from "config";
import { getStorage, removeStorage, setStorage } from "hooks";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setAccessTokenRedux, setUserInfoRedux } from "redux/Login/login.slice";
import { decodeJWT } from "utils";
import { Storage } from "utils/enums/storage.enums";

interface AuthLayoutProps {
  children: ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data: {
      accessToken: string;
      user_info: { [key: string]: any };
    } | null = getStorage(Storage.AUTH);
    if (data && data.accessToken) {
      const auth: {
        [key: string]: any;
      } | null = decodeJWT(data.accessToken);
      if (auth?.isExpired || !auth) {
        removeStorage(Storage.AUTH);
        navigate(Path.Login);
      } else if (auth?.isExpired === false) {
        dispatch(setAccessTokenRedux(data.accessToken));
        dispatch(setUserInfoRedux(data.user_info));
        if (pathname.match(Path.Login) || pathname === Path.HomePage) {
          navigate(Path.App);
        }
      }
    } else {
      removeStorage(Storage.AUTH);
      navigate(Path.Login);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <MainLoading />;

  return <Box>{children}</Box>;
};
export default AuthLayout;
