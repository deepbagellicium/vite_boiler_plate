import isEqual from "lodash/isEqual";
import { useMemo, ReactNode, useEffect } from "react";
import { useLocalStorage } from "hooks";
import { SettingsContext } from "./SettingContext";

interface Settings {
  [key: string]: any;
}

interface SettingsProviderProps {
  children: ReactNode;
  defaultSettings: Settings;
}

const STORAGE_KEY = "settings";

export function SettingsProvider({
  children,
  defaultSettings,
}: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage<Settings>(
    STORAGE_KEY,
    defaultSettings
  );

  const canReset = useMemo(
    () => !isEqual(state, defaultSettings),
    [state, defaultSettings]
  );

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      canReset,
      onReset: reset,
    }),
    [reset, update, state, canReset]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
