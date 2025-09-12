import { TableHead, TableRow, TableCell } from "@mui/material"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import SortIcon from "@mui/icons-material/Sort"
import { HeaderCell } from "./HeaderCell"
import type { SortQuery } from "../../../hooks/useBillsTable"

type TableHeaderProps = {
  tableHeaders: { label: string; sortable?: boolean }[]
  toggleSort: SortQuery | null
  directionOrder: "asc" | "desc" | null
  handleToggleSort?: (field: string, order: "asc" | "desc" | null) => void
  toggleFilterMenu: () => void
}

export const TableHeader = ({
  tableHeaders,
  directionOrder,
  toggleSort,
  handleToggleSort,
  toggleFilterMenu,
}: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {tableHeaders.map((item) => (
          <HeaderCell
            key={item.label}
            label={item.label}
            sortable={!!item.sortable}
            active={item.label === toggleSort?.field}
            directionOrder={directionOrder}
            onSort={() => handleToggleSort?.(item.label, directionOrder)}
            IconComponent={SortIcon}
          />
        ))}
        <TableCell align="left" onClick={toggleFilterMenu}>
          <FilterAltIcon fontSize="large" sx={{ cursor: "pointer" }} />
        </TableCell>
      </TableRow>
    </TableHead>
  )
}
