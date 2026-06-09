import { createTheme } from "@mui/material/styles";
import colors from "./colors";
import typography from "./typography";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },

    secondary: {
      main: colors.secondary,
    },

    success: {
      main: colors.success,
    },

    warning: {
      main: colors.warning,
    },

    error: {
      main: colors.error,
    },

    background: {
      default: colors.background,
      paper: colors.paper,
    },

    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },

  typography,

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 18px",
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 2px 12px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },
  },
});

export default theme;