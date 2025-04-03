import isEqual from "lodash/isEqual";
import { useMemo, ReactNode, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useLocalStorage } from "hooks";
import { SettingsContext } from "./SettingContext";
import { lightTheme, darkTheme } from "theme"; // Import MUI themes
import { LOCAL_STORAGE } from "config/enums";

interface Settings {
  themeMode: "light" | "dark";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface SettingsProviderProps {
  children: ReactNode;
  defaultSettings: Settings;
}

const STORAGE_KEY = LOCAL_STORAGE.SETTINGS;

export function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const { localStore, updateStorage, resetStorage } = useLocalStorage<Settings>(
    STORAGE_KEY,
    defaultSettings
  );

  const [themeMode, setThemeMode] = useState<"light" | "dark">(
    localStore.themeMode || defaultSettings.themeMode
  );

  useEffect(() => {
    updateStorage("themeMode", themeMode);
  }, [themeMode, updateStorage]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const canStorageReset = useMemo(
    () => !isEqual(localStore, defaultSettings),
    [localStore, defaultSettings]
  );

  const memoizedValue = useMemo(
    () => ({
      ...localStore,
      themeMode,
      setThemeMode,
      toggleTheme,
      onStorageUpdate: updateStorage,
      canStorageReset,
      onStorageReset: resetStorage,
    }),
    [resetStorage, updateStorage, localStore, canStorageReset, themeMode]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}
