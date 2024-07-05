/* eslint-disable no-empty-pattern */
import { Stack } from "@mui/material";
import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}
const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <Stack component="main" direction="column" sx={{ height: "100vh" }}>
      {children}
    </Stack>
  );
};
export default LoginLayout;
