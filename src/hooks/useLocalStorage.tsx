import { useEffect, useState, useCallback } from "react";
import { decrypt, encrypt } from "utils";

type StateType = Record<string, any>;

export function useLocalStorage<T extends StateType>(
  key: string,
  initialState: T
) {
  const [localStore, setLocalStore] = useState<T>(initialState);

  useEffect(() => {
    // get existing data
    const restored = getStorage<T>(key);
    if (!restored && initialState) {
      // if not found data and initialState is avaliable set default
      setStorage(key, initialState);
    }
    if (restored) {
      setLocalStore((prevValue) => ({
        ...prevValue,
        ...restored,
      }));
    }
  }, [key]);

  const updateState = useCallback(
    (updateValue: Partial<T>) => {
      setLocalStore((prevValue) => {
        const newState = {
          ...prevValue,
          ...updateValue,
        };
        setStorage(key, newState);
        return newState;
      });
    },
    [key]
  );

  const updateStorage = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      updateState({
        [name]: updateValue,
      } as Partial<T>);
    },
    [updateState]
  );

  const resetStorage = useCallback(() => {
    removeStorage(key);
    setLocalStore(initialState);
  }, [initialState, key]);

  return {
    localStore,
    updateStorage,
    resetStorage,
  };
}

export const getStorage = <T,>(key: string): T | null => {
  let value: T | null = null;
  try {
    const result = window.localStorage.getItem(key);
    if (result) {
      value = decrypt(result) as T;
    }
  } catch (error) {
    console.error(error);
  }

  return value;
};

export const setStorage = (key: string, value: any): void => {
  try {
    window.localStorage.setItem(key, encrypt(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeStorage = (key: string): void => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
