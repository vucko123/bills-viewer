import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f6f8fa",
    },
    text: {
      primary: "#1f2328",
      secondary: "#6b7280",
    },
    divider: "#e6e8eb",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffffff",
          color: "#1f2328",
        },
      },
    },
  },
})
