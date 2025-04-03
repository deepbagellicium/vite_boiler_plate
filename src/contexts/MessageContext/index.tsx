import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hook";
import toast from "react-hot-toast";
import { emptyMessageReducer } from "redux/Message/message.slice";

interface MessageContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { errorMessage, successMesssage, warningMessage } = useAppSelector(
    (state) => state.MessageReducer
  );

  useEffect(() => {
    if (!errorMessage && !successMesssage && !warningMessage) return;

    if (successMesssage) toast.success(successMesssage);
    if (errorMessage) toast.error(errorMessage);

    dispatch(emptyMessageReducer());
  }, [errorMessage, successMesssage, dispatch]);

  const showSuccess = (message: string) => {
    toast.success(message);
  };

  const showError = (message: string) => {
    toast.error(message);
  };

  return (
    <MessageContext.Provider value={{ showSuccess, showError }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
