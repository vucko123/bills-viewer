import { useEffect, useMemo } from "react"
import { useThemeStore } from "../store/theme"
import { darkTheme } from "./darkTheme"
import { lightTheme } from "./lightTheme"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import App from "../App"

const getSystemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"

export const ThemeSetter = () => {
  const mode = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const initial =
      saved === "dark" || saved === "light" ? saved : getSystemTheme()
    setTheme(initial)
  }, [setTheme])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-theme", mode)
    root.style.colorScheme = mode
  }, [mode])

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}
