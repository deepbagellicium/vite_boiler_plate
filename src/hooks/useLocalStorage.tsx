import { useEffect, useState, useCallback } from "react";

type StateType = Record<string, any>;

export function useLocalStorage<T extends StateType>(
  key: string,
  initialState: T
) {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    // get existing data
    const restored = getStorage<T>(key);
    if (!restored) {
      setStorage(key, initialState);
    }
    if (restored) {
      setState((prevValue) => ({
        ...prevValue,
        ...restored,
      }));
    }
  }, [key]);

  const updateState = useCallback(
    (updateValue: Partial<T>) => {
      setState((prevValue) => {
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

  const update = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      updateState({
        [name]: updateValue,
      } as Partial<T>);
    },
    [updateState]
  );

  const reset = useCallback(() => {
    removeStorage(key);
    setState(initialState);
  }, [initialState, key]);

  return {
    state,
    update,
    reset,
  };
}

export const getStorage = <T,>(key: string): T | null => {
  let value: T | null = null;

  try {
    const result = window.localStorage.getItem(key);

    if (result) {
      value = JSON.parse(result) as T;
    }
  } catch (error) {
    console.error(error);
  }

  return value;
};

export const setStorage = (key: string, value: any): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
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
