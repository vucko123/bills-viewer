import dayjs from "dayjs"
import type { Sponsor } from "../types/billTypes"
import type { FiltersOption } from "../hooks/useBillsTable"

export const paragraphToText = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "")
}

export const formatDate = (dateString: string) => {
  const formatted = dayjs(dateString).format("YYYY-MM-DD HH:mm")
  return formatted
}

export const convertFiltersToArray = (filters: FiltersOption) => {
  const result: string[] = []
  Array.from(Object.entries(filters)).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        result.push(`${key}: ${val}`)
      })
    } else if (value) {
      result.push(`${key}: ${value}`)
    }
  })
  return result
}

export const stringifyQueryKey = (filters: FiltersOption) => {
  return JSON.stringify({
    billStatus: [...(filters.billStatus ?? [])].sort(),
    billYear: filters.billYear ?? "",
    fromDate: filters.fromDate ?? "",
    toDate: filters.toDate ?? "",
    lastUpdated: filters.lastUpdated ?? "",
  })
}

export const normalizeFilters = (filters: FiltersOption) => {
  return {
    billStatus: [...(filters.billStatus ?? [])].sort(),
    billYear: filters.billYear ?? "",
    lastUpdated: filters.lastUpdated ?? "",
    fromDate: filters.fromDate ?? "",
    toDate: filters.toDate ?? "",
  }
}

export const formatSponsors = (sponsors: Sponsor[]) => {
  const result: string[] = []

  Object.keys(sponsors).forEach((key: any) => {
    const sponsor = sponsors[key].sponsor

    const asShowAs = sponsor?.as?.showAs
    const byShowAs = sponsor?.by?.showAs

    if (asShowAs) result.push(asShowAs)
    if (byShowAs) result.push(byShowAs)
  })

  return result
}
