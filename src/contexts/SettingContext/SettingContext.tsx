import { createContext, useContext } from "react";

interface Settings {
  [key: string]: any;
}

interface SettingsContextType extends Settings {
  onUpdate: (name: keyof Settings, value: Settings[keyof Settings]) => void;
  canReset: boolean;
  onReset: () => void;
}

const defaultSettingsContext: SettingsContextType = {
  onUpdate: () => {},
  canReset: false,
  onReset: () => {},
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
