import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect } from "vitest"
import { useModal } from "../hooks/useModal"
import { LanguageModal } from "../components/LanguageModal"

type SelectedBillTitles = { titleEn: string; titleGa: string }

const TestHost = ({ titles }: { titles: SelectedBillTitles }) => {
  const { Modal, openModal } = useModal(
    <LanguageModal selectedBillTitles={titles} />,
  )
  return (
    <div>
      <button onClick={openModal}>Open</button>
      <Modal />
    </div>
  )
}

describe("useModal hook", () => {
  it("opens the Dialog and renders LanguageModal content", async () => {
    const titles = { titleEn: "English Title", titleGa: "Gaeilge Title" }

    render(
      <MemoryRouter>
        <TestHost titles={titles} />
      </MemoryRouter>,
    )

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: /open/i }))

    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText("English Title")).toBeInTheDocument()
  })
})
