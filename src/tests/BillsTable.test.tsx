import "@testing-library/jest-dom"
import { render, screen, fireEvent, within } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { BillsTable } from "../components/BillsTable"

const defaultHeaders = [
  { label: "Bill Number", sortable: true },
  { label: "Bill Type", sortable: false },
  { label: "Bill Status", sortable: false },
  { label: "Sponsor", sortable: false },
  { label: "Bill Year", sortable: true },
  { label: "Last Updated", sortable: true },
] as const

const baseProps = (
  overrides?: Partial<Parameters<typeof BillsTable>[0]>,
): Parameters<typeof BillsTable>[0] => ({
  tableColumns: [...defaultHeaders],
  page: 0,
  rowsPerPage: 10,
  totalResults: 0,
  bills: [],
  isLoading: false,
  favorites: new Map<string, any>(),
  sortState: { field: "", order: null },
  billTypeOptions: [],
  billTypeFilter: "",
  onRowClick: vi.fn(),
  openLanguageModal: vi.fn(),
  toggleAddFavorite: vi.fn(),
  onOpenFilterMenu: vi.fn(),
  handleSortStateToggle: vi.fn(),
  handleChangeRowsPerPage: vi.fn(),
  paginationPageChange: vi.fn(),
  setBillTypeFilter: vi.fn(),
  ...overrides,
})

describe("BillsTable", () => {
  it("renders headers and empty state when there are no bills", () => {
    const props = baseProps()
    render(<BillsTable {...props} />)

    props.tableColumns.forEach((h) => {
      expect(
        screen.getByRole("columnheader", { name: h.label }),
      ).toBeInTheDocument()
    })

    expect(screen.getByText("No bills found.")).toBeInTheDocument()
  })

  it("renders a bill row; clicking the star toggles favorite without opening the row", () => {
    const bill = {
      uri: "bill://1",
      longTitleEn: "An Act (EN)",
      longTitleGa: "An Acht (GA)",
      billNumber: "1 of 2025",
      billType: "Public Bill",
      billStatus: "Enacted",
      billYear: "2025",
      lastUpdated: "2025-01-15T12:00:00Z",
      sponsors: [
        {
          sponsor: {
            as: { showAs: "Minister for Finance" },
            by: { showAs: null },
          },
        },
        { sponsor: { as: { showAs: null }, by: { showAs: "John Doe TD" } } },
      ],
    }

    const openLanguageModal = vi.fn()
    const toggleAddFavorite = vi.fn()

    render(
      <BillsTable
        {...baseProps({
          bills: [bill],
          totalResults: 1,
          openLanguageModal,
          toggleAddFavorite,
        })}
      />,
    )

    expect(screen.getByRole("cell", { name: "1 of 2025" })).toBeInTheDocument()
    expect(
      screen.getByRole("cell", { name: "Public Bill" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("cell", { name: "Enacted" })).toBeInTheDocument()

    const sponsorsCell = screen
      .getAllByRole("cell")
      .find((td) =>
        td.textContent?.includes("Minister for Finance"),
      ) as HTMLElement
    expect(sponsorsCell).toBeInTheDocument()
    expect(sponsorsCell.textContent).toContain("Minister for Finance")
    expect(sponsorsCell.textContent).toContain("John Doe TD")

    const row = screen.getByRole("button", {
      name: /1 of 2025 Public Bill Enacted/i,
    })

    const firstCell = within(row).getAllByRole("cell")[0]
    const favButton = within(firstCell).getByRole("button")
    fireEvent.click(favButton)

    expect(toggleAddFavorite).toHaveBeenCalledTimes(1)
    expect(toggleAddFavorite).toHaveBeenCalledWith(bill)
    expect(openLanguageModal).not.toHaveBeenCalled()
  })
})
