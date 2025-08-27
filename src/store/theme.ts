import { create } from "zustand"

export type Theme = "light" | "dark"

type AppState = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<AppState>((set, get) => ({
  theme: "light",
  setTheme: (currentTheme) => {
    set({ theme: currentTheme })
    localStorage.setItem("theme", currentTheme)
  },
  toggleTheme: () => {
    const newTheme: Theme = get().theme === "light" ? "dark" : "light"
    localStorage.setItem("theme", newTheme)
    set({ theme: newTheme })
  },
}))
