import axios from "axios"
import type {
  BillQueryKey,
  BillsResponse,
  BillsApiResponse,
  RawBill,
} from "../types/billTypes"

const API_BASE_URL = "https://api.oireachtas.ie/v1/legislation"

export const getBills = async ({
  lang = "en",
  billStatus,
  limit = 10,
  skip = 0,
  dateFrom,
  dateTo,
  lastUpdated,
  billYear,
}: BillQueryKey): Promise<BillsResponse> => {
  try {
    const queryParts = [
      "bills",
      `lang=${lang}`,
      billStatus ? `bill_status=${billStatus}` : null,
      `limit=${String(limit)}`,
      `skip=${String(skip)}`,
      billYear ? `bill_year=${billYear}` : null,
      dateFrom ? `date_from=${dateFrom}` : null,
      dateTo ? `date_to=${dateTo}` : null,
      lastUpdated ? `last_updated=${lastUpdated}` : null,
    ].filter(Boolean)

    const url = `${API_BASE_URL}?${queryParts.join("&")}`

    const { data } = await axios.get<BillsApiResponse>(url)

    const formattedBills = data.results.map((item: RawBill) => ({
      uri: item.bill.uri,
      longTitleEn: item.bill.longTitleEn,
      longTitleGa: item.bill.longTitleGa,
      billNumber: item.bill.billNo,
      billType: item.bill.billType,
      billStatus: item.bill.status,
      sponsors: item.bill.sponsors,
      lastUpdated: item.bill.lastUpdated,
      billYear: item.bill.billYear,
    }))

    return {
      bills: formattedBills,
      head: data.head,
    }
  } catch (error) {
    console.error("Error fetching bills:", error)
    throw error
  }
}
