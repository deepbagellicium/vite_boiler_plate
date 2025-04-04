import ReactDOM from "react-dom/client";
import AppRouter from "AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "redux/store";
import "assets/css/index.css";
import { SettingsProvider } from "contexts";
import { Suspense } from "react";
import { MainLoading } from "components";
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "contexts/AuthContext";
import { MessageProvider } from "contexts/MessageContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "use-query/query-client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <MessageProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: "light",
            }}
          >
            <BrowserRouter>
              <Suspense fallback={<MainLoading />}>
                <AuthProvider>
                  <AppRouter />
                </AuthProvider>
              </Suspense>
            </BrowserRouter>
          </SettingsProvider>
        </MessageProvider>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
