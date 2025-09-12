import { TableBody, TableCell, TableRow } from "@mui/material"
import { DataTableRow } from "./DataTableRow"
import { DataTableSkeleton } from "./TableSkeleton"
import type { Bill } from "../../../types/billTypes"

type DataTableBodyProps = {
  data: Bill[]
  tableHeaders: { label: string; sortable?: boolean }[]
  loading: boolean
  favorites: Map<string, Bill>
  handleOpen: (bill: Bill) => void
  toggleFavorite: (bill: Bill) => void
  onRowClick?: (bill: Bill) => void
  skeletonCount?: number
}

export const DataTableBody = ({
  data,
  tableHeaders,
  loading,
  favorites,
  handleOpen,
  toggleFavorite,
  onRowClick,
  skeletonCount = 10,
}: DataTableBodyProps) => {
  const cols = tableHeaders.length

  return (
    <TableBody>
      {loading && <DataTableSkeleton cols={cols} rows={skeletonCount} />}

      {!loading && data.length === 0 && (
        <TableRow>
          <TableCell colSpan={cols + 1} align="center">
            No bills found.
          </TableCell>
        </TableRow>
      )}

      {!loading &&
        data.length > 0 &&
        data.map((bill) => (
          <DataTableRow
            key={bill.uri}
            bill={bill}
            favorites={favorites}
            clickable={!!onRowClick}
            onOpen={handleOpen}
            onToggleFavorite={toggleFavorite}
          />
        ))}
    </TableBody>
  )
}
