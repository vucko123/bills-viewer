// LanguageModal.test.tsx
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { Tabs, Tab } from "@mui/material" // 1) import BEFORE vi.mock

vi.mock("../components/common/TabsComponent", () => ({
  TabsComponent: ({
    selectedTab,
    onTabChange,
  }: {
    selectedTab: string
    onTabChange: (e: any, value: string) => void
  }) => (
    <Tabs
      value={selectedTab}
      onChange={(e, v) => onTabChange(e, v)}
      aria-label="Language Tabs"
    >
      <Tab label="English" value="English" />
      <Tab label="Gaeilge" value="Gaeilge" />
    </Tabs>
  ),
}))

import { LanguageModal } from "../components/LanguageModal"

describe("LanguageModal", () => {
  it("renders English by default and switches to Gaeilge on tab click", () => {
    const titles = { titleEn: "English Title", titleGa: "Gaeilge Title" }

    render(<LanguageModal selectedBillTitles={titles} />)

    expect(screen.getByText("English Title")).toBeInTheDocument()
    expect(screen.queryByText("Gaeilge Title")).not.toBeInTheDocument()

    const englishTab = screen.getByRole("tab", { name: /english/i })
    const gaeilgeTab = screen.getByRole("tab", { name: /gaeilge/i })

    expect(englishTab).toHaveAttribute("aria-selected", "true")
    expect(gaeilgeTab).toHaveAttribute("aria-selected", "false")

    fireEvent.click(gaeilgeTab)

    expect(screen.getByText("Gaeilge Title")).toBeInTheDocument()
    expect(screen.queryByText("English Title")).not.toBeInTheDocument()

    expect(englishTab).toHaveAttribute("aria-selected", "false")
    expect(gaeilgeTab).toHaveAttribute("aria-selected", "true")
  })
})
