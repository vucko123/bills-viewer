export type SponsorRole = {
  showAs: string | null
}

export type Sponsor = {
  sponsor: {
    as: SponsorRole
    by: SponsorRole
  }
}

export type Bill = {
  uri: string
  billNumber: string
  billType: string
  billStatus: string
  longTitleEn: string
  longTitleGa: string
  sponsors: Sponsor[]
}
export type RawBill = {
  bill: {
    uri: string
    billNo: string
    billType: string
    status: string
    longTitleEn: string
    longTitleGa: string
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
}

export type OireachtasBillsApi = {
  head: {
    counts: {
      billCount: number
      resultsCount: number
    }
  }
  results: RawBill[]
}
