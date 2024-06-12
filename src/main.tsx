import ReactDOM from "react-dom/client";
import AppRouter from "AppRouter";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import "assets/css/index.css";
import { SettingsProvider } from "contexts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SettingsProvider
      defaultSettings={{
        themeMode: "light",
        themeColorPresets: "default",
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </SettingsProvider>
  </Provider>
);
