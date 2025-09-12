import { TableBody, TableCell, TableRow } from "@mui/material"
import { DataTableRow } from "./DataTableRow"
import { DataTableSkeleton } from "./DataTableSkeleton"
import type { Bill } from "../../../types/billTypes"
import type { TableColumnProps } from "../../../hooks/useBillsTable"

type DataTableBodyProps = {
  data: Bill[]
  tableColumns: TableColumnProps[]
  isLoading: boolean
  favorites: Map<string, Bill>
  skeletonCount?: number
  openLanguageModal: (bill: Bill) => void
  toggleAddFavorite: (bill: Bill) => void
  onRowClick?: (bill: Bill) => void
}

export const DataTableBody = ({
  data,
  tableColumns,
  isLoading,
  favorites,
  skeletonCount = 10,
  openLanguageModal,
  toggleAddFavorite,
  onRowClick,
}: DataTableBodyProps) => {
  const cols = tableColumns.length

  return (
    <TableBody>
      {isLoading && <DataTableSkeleton cols={cols} rows={skeletonCount} />}

      {!isLoading && data.length === 0 && (
        <TableRow>
          <TableCell colSpan={cols + 1} align="center">
            No bills found.
          </TableCell>
        </TableRow>
      )}

      {!isLoading &&
        data.length > 0 &&
        data.map((bill) => (
          <DataTableRow
            key={bill.uri}
            bill={bill}
            favorites={favorites}
            clickable={!!onRowClick}
            onOpen={openLanguageModal}
            toggleAddFavorite={toggleAddFavorite}
          />
        ))}
    </TableBody>
  )
}
