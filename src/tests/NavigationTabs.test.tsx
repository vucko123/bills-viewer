import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { NavigationTabs } from "../components/NavigationTabs"
import { MemoryRouter, Route, Routes } from "react-router-dom"

function renderWithRoutes(initialPath: string) {
  console.log("✌️initialPath --->", initialPath)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/bills" element={<NavigationTabs />}>
          <Route path="all" element={<div>All content</div>} />
          <Route path="favorites" element={<div>Favorites content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe("NavigationTabs", () => {
  it("highlights All Bills and shows its outlet on /bills/all", () => {
    renderWithRoutes("/bills/all")

    const allTab = screen.getByRole("tab", { name: /All Bills/i })
    const favTab = screen.getByRole("tab", { name: /Favorites/i })

    expect(allTab).toHaveAttribute("aria-selected", "true")
    expect(favTab).toHaveAttribute("aria-selected", "false")
    expect(screen.getByText("All content")).toBeInTheDocument()
  })

  it("highlights Favorites on /bills/favorites and navigates to All Bills when clicked", () => {
    renderWithRoutes("/bills/favorites")

    const allTab = screen.getByRole("tab", { name: /All Bills/i })
    const favTab = screen.getByRole("tab", { name: /Favorites/i })

    expect(favTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByText("Favorites content")).toBeInTheDocument()

    fireEvent.click(allTab)

    expect(allTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByText("All content")).toBeInTheDocument()
  })
})
