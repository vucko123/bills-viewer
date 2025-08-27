import { createTheme } from "@mui/material/styles"

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7aa2ff", contrastText: "#0b1020" },
    background: { default: "#0b1020", paper: "#121834" },
    text: { primary: "#e6e8ee", secondary: "#9aa3b2" },
    divider: "#20284e",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },

        ":root": {
          scrollbarColor: `${theme.palette.divider} ${theme.palette.background.paper}`,
          scrollbarWidth: "thin",
        },

        "*::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "*::-webkit-scrollbar-track": {
          background: theme.palette.background.paper,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.divider,
          borderRadius: "8px",
          border: `2px solid ${theme.palette.background.paper}`,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.palette.text.primary,
          opacity: 0.6,
        },
      }),
    },
  },
})
