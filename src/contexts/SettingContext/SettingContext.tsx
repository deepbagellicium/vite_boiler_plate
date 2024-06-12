import { createContext, useContext } from "react";

interface Settings {
  [key: string]: any;
}

interface SettingsContextType extends Settings {
  onStorageUpdate: (name: keyof Settings, value: Settings[keyof Settings]) => void;
  canStorageReset: boolean;
  onStorageReset: () => void;
}

const defaultSettingsContext: SettingsContextType = {
  onStorageUpdate: () => {},
  canStorageReset: false,
  onStorageReset: () => {},
};

export const SettingsContext = createContext<SettingsContextType>(
  defaultSettingsContext
);

export const useSettingsContext = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used inside SettingsProvider");
  }
  return context;
};
