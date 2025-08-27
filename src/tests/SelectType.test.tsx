import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { SelectType } from "../components/SelectType"

describe("SelectType", () => {
  it("renders options, shows selected value, and calls onChange when a new option is chosen", () => {
    const onChange = vi.fn()
    render(
      <SelectType
        label="Bill Type"
        billTypeOptions={["Public Bill", "Private Bill"]}
        filteredBillType="Public Bill"
        onChange={onChange}
      />,
    )

    const trigger = screen.getByLabelText(/Bill Type/i)
    expect(trigger).toHaveTextContent("Public Bill")

    fireEvent.mouseDown(trigger)
    const option = screen.getByRole("option", { name: "Private Bill" })
    fireEvent.click(option)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("Private Bill")
  })

  it("handles out-of-range value and shows 'No options available' when options list is empty", () => {
    const onChange = vi.fn()
    render(
      <SelectType
        label="Bill Type"
        billTypeOptions={[]}
        filteredBillType="Some Unknown Type"
        onChange={onChange}
      />,
    )

    const trigger = screen.getByLabelText(/Bill Type/i)

    fireEvent.mouseDown(trigger)

    const emptyItem = screen.getByRole("option", {
      name: /No options available/i,
    })
    expect(emptyItem).toBeInTheDocument()
    expect(emptyItem).toHaveAttribute("aria-disabled", "true")
  })
})
