import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Path } from "config";

interface PrivateLayoutProps {}
const PrivateLayout: React.FC<PrivateLayoutProps> = ({}) => {
  const navigate = useNavigate();
  const isLoggedIn = false;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.Login);
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return;
  }

  return (
    <Box>
      <Outlet />
    </Box>
  );
};
export default PrivateLayout;
