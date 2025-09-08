import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ThemeSetter } from "./theme/ThemeSetter.tsx"
import { useThemeStore } from "./store/theme.ts"

const queryClient = new QueryClient()

const saved = localStorage.getItem("theme")
const system = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light"
const initial = saved === "dark" || saved === "light" ? saved : system
document.documentElement.setAttribute("data-theme", initial)
document.documentElement.style.colorScheme = initial
useThemeStore.setState({ theme: initial })

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <ThemeSetter />
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>,
)
