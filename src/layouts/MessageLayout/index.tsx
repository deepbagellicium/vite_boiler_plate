import { Box } from "@mui/material";
import React, { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { emptyMessageReducer } from "redux/Message/message.slice";
import { useAppDispatch, useAppSelector } from "redux/hook";

interface MessageLayoutProps {
  children: ReactNode;
}

const MessageLayout: React.FC<MessageLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { errormessage, successmesssage } = useAppSelector(
    (state) => state.MessageReducer
  );

  useEffect(() => {
    if (successmesssage) toast.success(successmesssage);
    if (errormessage) toast.error(errormessage);
    dispatch(emptyMessageReducer());
  }, [errormessage, successmesssage]);

  return <Box>{children}</Box>;
};
export default MessageLayout;
