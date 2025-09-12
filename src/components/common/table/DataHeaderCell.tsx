import { Box, TableCell, TableSortLabel } from "@mui/material"
import SortIcon from "@mui/icons-material/Sort"
import type { ReactNode } from "react"

type HeaderCellProps = {
  label: string
  sortable?: boolean
  active?: boolean
  directionOrder: "asc" | "desc" | null
  onSort?: () => void
  icon?: ReactNode
}

export const DataHeaderCell = ({
  label,
  sortable = false,
  active = false,
  directionOrder,
  onSort,
  icon,
}: HeaderCellProps) => {
  const iconNode = icon ?? <SortIcon fontSize="small" />

  return (
    <TableCell
      sortDirection={false}
      sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
    >
      {sortable ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {iconNode}
          <TableSortLabel
            onClick={onSort}
            active={active}
            direction={directionOrder ?? "desc"}
            sx={{ ml: 0.5 }}
          >
            {label}
          </TableSortLabel>
        </Box>
      ) : (
        label
      )}
    </TableCell>
  )
}
