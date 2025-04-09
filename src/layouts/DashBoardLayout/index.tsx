import React, { useState } from "react";
import { Box } from "@mui/material";
import Topbar from "components/Topbar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout: React.FC = ({}) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
