import { useMemo } from "react"
import { useBillApi } from "./useBillApi"
import { useFavoritesStore } from "../store/favorites"
import { formatDate, normalizeFilters } from "../utils/utils"
import type { FiltersOption, SortQuery } from "./useBillsTable"

type UseBillsData = {
  isFavorites: boolean
  page: number
  rowsPerPage: number
  sortQuery?: SortQuery | null
  filteredBillByStatus: string[]
  filteredBillType: string
  filterQuery?: FiltersOption
  stringifiedApiQueryKey?: string | null
}

export const useBillsData = ({
  isFavorites,
  page,
  rowsPerPage,
  filteredBillType,
  sortQuery = null,
  filterQuery,
  stringifiedApiQueryKey = null,
}: UseBillsData) => {
  const favorites = useFavoritesStore((state) => state.favorites)

  // fetching bills
  const { data, isError, refetch, isFetching } = useBillApi({
    page,
    rowsPerPage,
    billStatus: filterQuery?.billStatus?.join(","),
    enabled: !isFavorites,
    billYear: filterQuery?.billYear,
    fromDate: filterQuery?.fromDate,
    toDate: filterQuery?.toDate,
    lastUpdated: filterQuery?.lastUpdated,
    stringifiedApiQueryKey,
  })

  const bills = useMemo(() => data?.bills ?? [], [data])

  const appliedFilters = useMemo(
    () => normalizeFilters(filterQuery ?? {}),
    [stringifiedApiQueryKey],
  )

  // decide between favorites and API data
  const billsData = useMemo(() => {
    if (isFavorites) {
      let favs = Array.from(favorites.values())

      if (appliedFilters.billStatus.length) {
        favs = favs.filter((b) =>
          appliedFilters.billStatus.includes(b.billStatus),
        )
      }

      if (filteredBillType) {
        favs = favs.filter((b) => b.billType === filteredBillType)
      }

      if (appliedFilters.billYear) {
        favs = favs.filter((b) => b.billYear === appliedFilters.billYear)
      }

      if (appliedFilters.lastUpdated) {
        favs = favs.filter(
          (b) => formatDate(b.lastUpdated) === appliedFilters.lastUpdated,
        )
      }

      if (appliedFilters.fromDate) {
        favs = favs.filter(
          (b) => formatDate(b.lastUpdated) >= appliedFilters.fromDate!,
        )
      }
      if (appliedFilters.toDate) {
        favs = favs.filter(
          (b) => formatDate(b.lastUpdated) <= appliedFilters.toDate!,
        )
      }

      return favs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    return filteredBillType
      ? bills.filter((b) => b.billType === filteredBillType)
      : bills
  }, [
    isFavorites,
    favorites,
    page,
    rowsPerPage,
    bills,
    appliedFilters,
    filteredBillType,
  ])

  let total = isFavorites ? favorites.size : (data?.head?.counts.billCount ?? 0)

  if (billsData.length < 1) {
    total = 0
  }

  const billTypeOptions = useMemo(() => {
    return isFavorites
      ? Array.from(new Set(billsData.map((bill) => bill.billType)))
      : Array.from(new Set(bills.map((bill) => bill.billType)))
  }, [page, rowsPerPage, bills])

  const sortBills = (sortQuery: SortQuery) => {
    const sortedBills = [...billsData].sort((a, b) => {
      let aValue: string | number = ""
      let bValue: string | number = ""

      if (sortQuery.field === "Bill Number") {
        aValue = Number(a.billNumber)
        bValue = Number(b.billNumber)
      } else if (sortQuery.field === "Last Updated") {
        aValue = new Date(a.lastUpdated).getTime()
        bValue = new Date(b.lastUpdated).getTime()
      } else if (sortQuery.field === "Bill Year") {
        aValue = parseInt(a.billYear, 10)
        bValue = parseInt(b.billYear, 10)
      }

      if (aValue < bValue) return sortQuery.order === "asc" ? -1 : 1
      if (aValue > bValue) return sortQuery.order === "asc" ? 1 : -1
      return 0
    })

    return sortedBills
  }

  const updatedBills =
    sortQuery?.field && sortQuery?.order ? sortBills(sortQuery) : billsData

  return {
    bills: updatedBills,
    total,
    billTypeOptions,
    isFetching,
    isError,
    refetch,
    sortBills,
  }
}
