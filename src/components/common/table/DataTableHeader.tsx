import { TableHead, TableRow, TableCell } from "@mui/material"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import SortIcon from "@mui/icons-material/Sort"
import { DataHeaderCell } from "./DataHeaderCell"
import type { SortQuery, TableColumnProps } from "../../../hooks/useBillsTable"

type TableHeaderProps = {
  tableColumns: TableColumnProps[]
  sortState: SortQuery | null
  handleSortStateToggle?: (field: string, order: "asc" | "desc" | null) => void
  filterMenuOpenToggle: () => void
}

export const DataTableHeader = ({
  tableColumns,
  sortState,
  handleSortStateToggle,
  filterMenuOpenToggle,
}: TableHeaderProps) => {
  const directionOrder = sortState?.order === "asc" ? "asc" : "desc"

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {tableColumns.map((item) => (
          <DataHeaderCell
            key={item.label}
            label={item.label}
            sortable={!!item.sortable}
            active={item.label === sortState?.field}
            directionOrder={directionOrder}
            onSort={() => handleSortStateToggle?.(item.label, directionOrder)}
            icon={<SortIcon fontSize="small" />}
          />
        ))}
        <TableCell align="left" onClick={filterMenuOpenToggle}>
          <FilterAltIcon fontSize="large" sx={{ cursor: "pointer" }} />
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
