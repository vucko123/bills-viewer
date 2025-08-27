import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import type { Bill, Sponsor } from "../types/billTypes"
import IconButton from "@mui/material/IconButton"
import StarIcon from "@mui/icons-material/Star"
import StarBorder from "@mui/icons-material/StarBorder"
import { Skeleton } from "@mui/material"
import type { ChangeEvent } from "react"

type BillsTableProps = {
  tableHeaders: string[]
  page: number
  rowsPerPage: number
  total: number
  bills: Bill[]
  loading?: boolean
  selectSetFavorites?: Bill[]
  favorites: Map<string, Bill>
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
  onRowClick?: (bill: Bill) => void
  handleOpen: (bill: Bill) => void
  toggleFavorite: (bill: Bill) => void
}

export const BillsTable = ({
  tableHeaders,
  page,
  rowsPerPage,
  total,
  bills,
  loading,
  favorites,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  handleOpen,
  toggleFavorite,
}: BillsTableProps) => {
  const handleChangePage = (_e: unknown, newPage: number): void => {
    onPageChange(newPage)
  }

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>): void => {
    onRowsPerPageChange(Number(e.target.value))
    onPageChange(0)
  }

  const formatSponsors = (sponsors: Sponsor[]) => {
    const result: string[] = []

    Object.keys(sponsors).forEach((key: any) => {
      const sponsor = sponsors[key].sponsor

      const asShowAs = sponsor?.as?.showAs
      const byShowAs = sponsor?.by?.showAs

      if (asShowAs) result.push(asShowAs)
      if (byShowAs) result.push(byShowAs)
    })

    return result
  }
  const skeletonRows = Array.from({ length: Math.min(rowsPerPage, 12) })

  return (
    <Paper sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer
        sx={{
          maxHeight: { xs: "calc(100vh - 350px)", sm: 440 },
          "& .MuiTableCell-stickyHeader": {
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            zIndex: 2,
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <Table stickyHeader size="small" aria-label="bills table">
          <TableHead>
            <TableRow>
              <TableCell />
              {tableHeaders.map((item) => (
                <TableCell
                  key={item}
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading &&
              skeletonRows.map((_, i) => (
                <TableRow key={`skeleton-${String(i)}`}>
                  <TableCell padding="normal" align="left">
                    <Skeleton variant="circular" width={24} height={24} />
                  </TableCell>
                  {tableHeaders.map((header) => (
                    <TableCell key={`s-${String(i)}-${header}`}>
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading && bills.length === 0 && (
              <TableRow>
                <TableCell colSpan={tableHeaders.length + 1} align="center">
                  No bills found.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              bills.length > 0 &&
              bills.map((bill) => (
                <TableRow
                  key={bill.uri}
                  hover
                  role="button"
                  tabIndex={onRowClick ? 0 : -1}
                  onClick={() => handleOpen(bill)}
                >
                  <TableCell padding="normal" align="left">
                    <IconButton
                      size="small"
                      aria-label={
                        favorites.get(bill.uri)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(bill)
                      }}
                    >
                      {favorites.get(bill.uri) ? (
                        <StarIcon sx={{ color: "#FDDA0D" }} />
                      ) : (
                        <StarBorder />
                      )}
                    </IconButton>
                  </TableCell>

                  <TableCell>{bill.billNumber}</TableCell>
                  <TableCell>{bill.billType}</TableCell>
                  <TableCell>{bill.billStatus}</TableCell>
                  <TableCell>
                    {bill.sponsors.length > 0 && formatSponsors(bill.sponsors)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 25, 50, 100]}
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
