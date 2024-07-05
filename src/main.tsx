import ReactDOM from "react-dom/client";
import AppRouter from "AppRouter";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import "assets/css/index.css";
import { SettingsProvider, SocketProvider } from "contexts";
import MessageLayout from "layouts/MessageLayout";
import AuthLayout from "layouts/AuthLayout";
import { Suspense } from "react";
import { MainLoading } from "components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    <Provider store={store}>
      <MessageLayout>
        <SettingsProvider
          defaultSettings={{
            themeMode: "light",
            themeColorPresets: "default",
          }}
        >
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <AuthLayout>
                <Suspense fallback={<MainLoading />}>
                  <AppRouter />
                </Suspense>
              </AuthLayout>
            </BrowserRouter>
          </ThemeProvider>
        </SettingsProvider>
      </MessageLayout>
    </Provider>
  </SocketProvider>
);
