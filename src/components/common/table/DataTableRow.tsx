import { IconButton, TableCell, TableRow } from "@mui/material"
import StarIcon from "@mui/icons-material/Star"
import StarBorder from "@mui/icons-material/StarBorder"
import type { Bill } from "../../../types/billTypes"
import { formatDate, formatSponsors } from "../../../utils/utils"

type DataTableRowProps = {
  bill: Bill
  favorites: Map<string, Bill>
  clickable?: boolean
  onOpen: (bill: Bill) => void
  onToggleFavorite: (bill: Bill) => void
}

export const DataTableRow = ({
  bill,
  favorites,
  clickable = true,
  onOpen,
  onToggleFavorite,
}: DataTableRowProps) => {
  return (
    <TableRow
      hover
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : -1}
      sx={{ cursor: clickable ? "pointer" : "default" }}
      onClick={() => onOpen(bill)}
    >
      <TableCell padding="normal" align="left">
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(bill)
          }}
        >
          {favorites.get(bill.uri) ? (
            <StarIcon color="primary" />
          ) : (
            <StarBorder />
          )}
        </IconButton>
      </TableCell>

      <TableCell>{bill.billNumber}</TableCell>
      <TableCell>{bill.billType}</TableCell>
      <TableCell>{bill.billStatus}</TableCell>
      <TableCell>
        {bill.sponsors.length ? formatSponsors(bill.sponsors) : "—"}
      </TableCell>
      <TableCell>{bill.billYear}</TableCell>
      <TableCell>{formatDate(String(new Date(bill.lastUpdated)))}</TableCell>
    </TableRow>
  )
}
