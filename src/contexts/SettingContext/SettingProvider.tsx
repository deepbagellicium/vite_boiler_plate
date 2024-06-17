import isEqual from "lodash/isEqual";
import { useMemo, ReactNode } from "react";
import { useLocalStorage } from "hooks";
import { SettingsContext } from "./SettingContext";
import { LOCAL_STORAGE } from "utils";

interface Settings {
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

  const canStorageReset = useMemo(
    () => !isEqual(localStore, defaultSettings),
    [localStore, defaultSettings]
  );

  const memoizedValue = useMemo(
    () => ({
      ...localStore,
      onStorageUpdate: updateStorage,
      canStorageReset,
      onStorageReset: resetStorage,
    }),
    [resetStorage, updateStorage, localStore, canStorageReset]
  );

  return (
    <SettingsContext.Provider value={memoizedValue}>
      {children}
    </SettingsContext.Provider>
  );
}
