import type { Bill, Sponsor } from "./uiTypes"

export type RawBill = {
  bill: {
    uri: string
    billNo: string
    billType: string
    status: string
    longTitleEn: string
    longTitleGa: string
    lastUpdated: string
    billYear: string
    sponsors: Sponsor[]
  }
}

export type BillsResponse = {
  bills: Bill[]
  head: {
    counts: {
      billCount: number
      resultsCount: number
    }
  }
}

export type BillQueryKey = {
  lang: string
  limit: number
  billStatus?: string
  skip?: number
  billYear?: string
  dateFrom?: string
  dateTo?: string
  lastUpdated?: string
}

export type BillsApiResponse = {
  head: {
    counts: {
      billCount: number
      resultsCount: number
    }
  }
  results: RawBill[]
}
