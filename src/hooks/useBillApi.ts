import { useQuery, keepPreviousData } from "@tanstack/react-query"
import type { BillQueryKey } from "../types/billTypes"
import { getBills } from "../api/billsApi"

export const useBillApi = ({
  page,
  rowsPerPage,
  billStatus,
  lang = "en",
  enabled = true,
}: {
  page: number
  rowsPerPage: number
  billStatus?: string
  lang?: string
  enabled?: boolean
}) => {
  const skip = page * rowsPerPage

  const params: BillQueryKey & { skip: number } = {
    lang,
    billStatus,
    limit: rowsPerPage,
    skip,
  }

  return useQuery({
    queryKey: ["bills", params],
    queryFn: () => getBills(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    enabled,
  })
}
