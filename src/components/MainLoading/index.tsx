import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { useSettingsContext } from "contexts";
import { main_loading } from "assets/images";

const MainLoading = () => {
  const settings = useSettingsContext();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Box
            component="img"
            src={settings.themeMode === "light" ? main_loading : main_loading}
            sx={{ width: 100 }}
          />
        </Box>
        <LinearProgress
          sx={{
            width: "300px",
          }}
        />
      </Box>
    </Box>
  );
};

export default MainLoading;
