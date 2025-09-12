import { useQuery, keepPreviousData } from "@tanstack/react-query"
import type { BillQueryKey } from "../types/billTypes"
import { getBills } from "../api/billsApi"

export const useBillApi = ({
  page,
  rowsPerPage,
  billStatus,
  lang = "en",
  enabled = false,
  billYear,
  fromDate,
  toDate,
  lastUpdated,
  stringifiedApiQueryKey = null,
}: {
  page: number
  rowsPerPage: number
  billStatus?: string
  lang?: string
  enabled?: boolean
  billYear?: string
  fromDate?: string
  toDate?: string
  lastUpdated?: string
  stringifiedApiQueryKey?: string | null
}) => {
  const skip = page * rowsPerPage
  const params: BillQueryKey & { skip: number } = {
    lang,
    billStatus,
    limit: rowsPerPage,
    skip,
    billYear,
    dateFrom: fromDate,
    dateTo: toDate,
    lastUpdated,
  }

  return useQuery({
    queryKey: ["bills", page, rowsPerPage, stringifiedApiQueryKey],
    queryFn: () => getBills(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    enabled,
  })
}
