import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

// Define common theme options
const commonThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    body1: { fontSize: "1rem", fontWeight: 400 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  spacing: 8, // 1 unit = 8px
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 20px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        },
      },
    },
  },
};

// Light mode theme
export const lightTheme = responsiveFontSizes(
  createTheme({
    ...commonThemeOptions,
    palette: {
      mode: "light" as PaletteMode,
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
        contrastText: "#fff",
      },
      secondary: {
        main: "#ff4081",
        light: "#ff79b0",
        dark: "#c60055",
        contrastText: "#fff",
      },
      background: {
        default: "#f4f6f8",
        paper: "#ffffff",
      },
      text: {
        primary: "#333",
        secondary: "#666",
      },
    },
  })
);

// Dark mode theme
export const darkTheme = responsiveFontSizes(
  createTheme({
    ...commonThemeOptions,
    palette: {
      mode: "dark" as PaletteMode,
      primary: {
        main: "#90caf9",
        light: "#e3f2fd",
        dark: "#42a5f5",
        contrastText: "#000",
      },
      secondary: {
        main: "#f48fb1",
        light: "#ff79b0",
        dark: "#c60055",
        contrastText: "#000",
      },
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#fff",
        secondary: "#bdbdbd",
      },
    },
  })
);
