import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Path } from "config";

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "#d32f2f" }} />
      <Typography
        variant="h1"
        fontWeight="bold"
        sx={{ fontSize: "6rem", color: "#d32f2f" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color: "#333" }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: "#666" }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        component={Link}
        to={Path.App}
        variant="contained"
        color="primary"
        sx={{
          px: 4,
          py: 1,
          fontSize: "1rem",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
