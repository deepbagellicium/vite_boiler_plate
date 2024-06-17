import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Path } from "config";

interface PrivateLayoutProps {}
const PrivateLayout: React.FC<PrivateLayoutProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Outlet />
    </Box>
  );
};
export default PrivateLayout;
