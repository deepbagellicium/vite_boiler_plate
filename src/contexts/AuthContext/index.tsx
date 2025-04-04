import { MainLoading } from "components";
import { Path } from "config";
import { LOCAL_STORAGE } from "config/enums";
import { getStorage, removeStorage, setStorage } from "hooks";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hook";
import {
  onEmptyUserInformation,
  onSetUserInformation,
} from "redux/Login/login.slice";
// import { onPurgePersist } from "redux/store";
import { decodeJWT } from "utils";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: Record<string, unknown>;
  role: string;
}

interface AuthData {
  accessToken: string;
  user_info: Record<string, unknown>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [tokenValidateLoader, setTokenValidateLoader] = useState<boolean>(true);

  const { user_info } = useAppSelector((_st) => _st.LoginReducer);

  const login = () => {
    // http://jwtbuilder.jamiekurtz.com
    setStorage(LOCAL_STORAGE.AUTH, {
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDM2NzY0NzUsImV4cCI6MTc3NTI5ODg3NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.YHP1YEAYVLI_Q2CfAoEcFrS4HcwTkY01WWvVWqGLYNo",
    });
    setIsAuthenticated(true);
    onTokenValidate();
  };

  const logout = () => {
    removeStorage(LOCAL_STORAGE.AUTH);
    // onPurgePersist();
    dispatch(onEmptyUserInformation());
    setIsAuthenticated(false);
    setTokenValidateLoader(false);
  };

  const onTokenValidate = () => {
    const authData: AuthData | null = getStorage<AuthData>(LOCAL_STORAGE.AUTH);
    if (!authData?.accessToken) {
      logout();
      return;
    }

    const decodedToken = decodeJWT(authData.accessToken) as {
      isExpired?: boolean;
    };
    if (!decodedToken || decodedToken.isExpired) {
      logout();
      return;
    }

    dispatch(
      onSetUserInformation({
        ...decodedToken,
        accessToken: authData?.accessToken,
      })
    );
    console.log("auth", {
      ...decodedToken,
      accessToken: authData?.accessToken,
    });
    setIsAuthenticated(true);
    setTokenValidateLoader(false);
    navigate(Path.App);
  };

  useEffect(() => {
    onTokenValidate();
  }, [dispatch]);

  if (tokenValidateLoader) return <MainLoading />;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user: user_info,
        role: user_info?.role as string,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
