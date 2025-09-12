import { Box, TableCell, TableSortLabel } from "@mui/material"
import SortIcon from "@mui/icons-material/Sort"
import type { ElementType } from "react"

type HeaderCellProps = {
  label: string
  sortable?: boolean
  active?: boolean
  directionOrder: "asc" | "desc" | null
  onSort?: () => void
  IconComponent?: ElementType
}

export const HeaderCell = ({
  label,
  sortable = false,
  active = false,
  directionOrder,
  onSort,
  IconComponent,
}: HeaderCellProps) => {
  const Icon = IconComponent ?? SortIcon

  return (
    <TableCell
      sortDirection={false}
      sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
    >
      {sortable ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Icon fontSize="small" sx={{ mr: 0.5 }} />
          <TableSortLabel
            onClick={onSort}
            active={active}
            direction={directionOrder ?? "desc"}
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
