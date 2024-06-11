import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

interface LoginLayoutProps {}
const LoginLayout: React.FC<LoginLayoutProps> = ({}) => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};
export default LoginLayout;
