export type SortQuery = {
  field: string
  order: "asc" | "desc" | null
}

export type FiltersOption = {
  billStatus?: string[]
  billYear?: string
  lastUpdated?: string
  fromDate?: string
  toDate?: string
}

export type SelectedBill = {
  titleEn: string
  titleGa: string
}

export type Bill = {
  uri: string
  billNumber: string
  billType: string
  billStatus: string
  longTitleEn: string
  longTitleGa: string
  lastUpdated: string
  billYear: string
  sponsors: Sponsor[]
}

export type SponsorRole = {
  showAs: string | null
}

export type Sponsor = {
  sponsor: {
    as: SponsorRole
    by: SponsorRole
  }
}
