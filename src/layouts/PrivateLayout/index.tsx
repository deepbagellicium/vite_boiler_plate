import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "components";

interface PrivateLayoutProps {}
const PrivateLayout: React.FC<PrivateLayoutProps> = ({}) => {
  return (
    <Box>
      {/* <Header route="/app" /> */}
      <Box
        sx={{
          paddingTop: "80px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default PrivateLayout;
