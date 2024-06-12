import { useEffect, useState, useCallback } from "react";
import { decrypt, encrypt } from "utils";

type StateType = Record<string, any>;

export function useSessionStorage<T extends StateType>(
  key: string,
  initialState: T
) {
  const [localSession, setLocalSession] = useState<T>(initialState);

  useEffect(() => {
    // get existing data
    const restored = getSession<T>(key);
    if (!restored) {
      setSession(key, initialState);
    }
    if (restored) {
      setLocalSession((prevValue) => ({
        ...prevValue,
        ...restored,
      }));
    }
  }, [key]);

  const updateState = useCallback(
    (updateValue: Partial<T>) => {
      setLocalSession((prevValue) => {
        const newState = {
          ...prevValue,
          ...updateValue,
        };
        setSession(key, newState);
        return newState;
      });
    },
    [key]
  );

  const updateSession = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      updateState({
        [name]: updateValue,
      } as Partial<T>);
    },
    [updateState]
  );

  const resetSession = useCallback(() => {
    removeSession(key);
    setLocalSession(initialState);
  }, [initialState, key]);

  return {
    localSession,
    updateSession,
    resetSession,
  };
}

export const getSession = <T,>(key: string): T | null => {
  let value: T | null = null;
  try {
    const result = window.sessionStorage.getItem(key);
    if (result) {
      value = decrypt(result) as T;
    }
  } catch (error) {
    console.error(error);
  }

  return value;
};

export const setSession = (key: string, value: any): void => {
  try {
    window.sessionStorage.setItem(key, encrypt(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeSession = (key: string): void => {
  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
