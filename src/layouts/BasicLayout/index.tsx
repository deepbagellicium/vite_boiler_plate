import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

interface BasicLayoutProps {}
const BasicLayout: React.FC<BasicLayoutProps> = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};
export default BasicLayout;
