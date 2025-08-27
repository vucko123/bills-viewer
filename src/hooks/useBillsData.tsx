import { useMemo } from "react"
import { useBillApi } from "./useBillApi"
import { useFavoritesStore } from "../store/favorites"

type UseBillsData = {
  isFavorites: boolean
  page: number
  rowsPerPage: number
  filteredBillByStatus: string[]
  filteredBillType: string
}

export const useBillsData = ({
  isFavorites,
  page,
  rowsPerPage,
  filteredBillByStatus,
  filteredBillType,
}: UseBillsData) => {
  const favorites = useFavoritesStore((state) => state.favorites)

  // fetching bills
  const { data, isError, refetch, isFetching } = useBillApi({
    page,
    rowsPerPage,
    billStatus: filteredBillByStatus.join(","),
    enabled: !isFavorites,
  })

  const bills = useMemo(() => data?.bills ?? [], [data])
  // decide between favorites and API data
  const billsData = useMemo(() => {
    if (isFavorites) {
      let favs = Array.from(favorites.values())

      if (filteredBillByStatus.length > 0) {
        favs = favs.filter((b) => filteredBillByStatus.includes(b.billStatus))
      }
      if (filteredBillType) {
        favs = favs.filter((b) => b.billType === filteredBillType)
      }

      return favs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    return filteredBillType
      ? bills.filter((b) => b.billType === filteredBillType)
      : bills
  }, [
    isFavorites,
    favorites,
    bills,
    page,
    rowsPerPage,
    filteredBillByStatus,
    filteredBillType,
  ])

  const total = isFavorites
    ? favorites.size
    : (data?.head?.counts.billCount ?? 0)

  const billTypeOptions = isFavorites
    ? Array.from(new Set(billsData.map((b) => b.billType)))
    : Array.from(new Set(bills.map((b) => b.billType)))

  return {
    bills: billsData,
    total,
    billTypeOptions,
    isFetching,
    isError,
    refetch,
  }
}
