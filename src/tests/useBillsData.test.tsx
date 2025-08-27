import { describe, it, expect, vi } from "vitest"
import "@testing-library/jest-dom"
import { renderHook } from "@testing-library/react"
import { useBillsData } from "../hooks/useBillsData"

vi.mock("../hooks/useBillApi", () => ({
  useBillApi: vi.fn(),
}))

vi.mock("../store/favorites", () => ({
  useFavoritesStore: vi.fn(),
}))

import { useBillApi } from "../hooks/useBillApi"
import { useFavoritesStore } from "../store/favorites"

describe("useBillsData - API mode", () => {
  it("returns bills from API when isFavorites is false", () => {
    const mockBills = [
      { billType: "TypeA", billStatus: "Active", uri: "1" },
      { billType: "TypeB", billStatus: "Inactive", uri: "2" },
    ]

    ;(useBillApi as any).mockReturnValue({
      data: {
        bills: mockBills,
        head: { counts: { billCount: 2 } },
      },
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
    })
    ;(useFavoritesStore as any).mockReturnValue(new Map())

    const { result } = renderHook(() =>
      useBillsData({
        isFavorites: false,
        page: 0,
        rowsPerPage: 10,
        filteredBillByStatus: [],
        filteredBillType: "",
      }),
    )

    expect(result.current.bills).toEqual(mockBills)
    expect(result.current.total).toBe(2)
    expect(result.current.billTypeOptions).toEqual(["TypeA", "TypeB"])
  })
})

describe("useBillsData - Favorites mode", () => {
  it("filters and paginates favorite bills", () => {
    const favoriteBills = new Map([
      ["1", { billType: "TypeA", billStatus: "Active", uri: "1" }],
      ["2", { billType: "TypeB", billStatus: "Inactive", uri: "2" }],
      ["3", { billType: "TypeA", billStatus: "Active", uri: "3" }],
    ])

    ;(useBillApi as any).mockReturnValue({
      data: {},
      isError: false,
      refetch: vi.fn(),
      isFetching: false,
    })
    ;(useFavoritesStore as any).mockReturnValue(favoriteBills)

    const { result } = renderHook(() =>
      useBillsData({
        isFavorites: true,
        page: 0,
        rowsPerPage: 2,
        filteredBillByStatus: ["Active"],
        filteredBillType: "TypeA",
      }),
    )

    expect(result.current.bills).toEqual([
      { billType: "TypeA", billStatus: "Active", uri: "1" },
      { billType: "TypeA", billStatus: "Active", uri: "3" },
    ])
    expect(result.current.total).toBe(3)
    expect(result.current.billTypeOptions).toEqual(["TypeA"])
  })
})
