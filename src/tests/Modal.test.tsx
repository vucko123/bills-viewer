import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { TransitionsModal } from "../components/Modal"

const selectedBill = {
  titleEn: "English long title",
  titleGa: "Gaeilge long title",
}

describe("TransitionsModal", () => {
  it("shows English by default and switches to Gaeilge when the tab is clicked", () => {
    render(
      <TransitionsModal
        open={true}
        handleClose={() => {}}
        selectedBill={selectedBill}
      />,
    )

    expect(screen.getByText(/English long title/i)).toBeInTheDocument()

    const gaeilgeTab = screen.getByRole("tab", { name: /Gaeilge/i })
    fireEvent.click(gaeilgeTab)
    expect(screen.getByText(/Gaeilge long title/i)).toBeInTheDocument()
  })

  it("calls handleClose when Escape is pressed (focus the dialog first)", () => {
    const handleClose = vi.fn()
    render(
      <TransitionsModal
        open={true}
        handleClose={handleClose}
        selectedBill={selectedBill}
      />,
    )

    const dialog = screen.getByRole("dialog")
    dialog.focus()

    fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" })

    expect(handleClose).toHaveBeenCalled()
  })
})
