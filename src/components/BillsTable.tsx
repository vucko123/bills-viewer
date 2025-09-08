import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import StarIcon from "@mui/icons-material/Star"
import StarBorder from "@mui/icons-material/StarBorder"
import { Box, Divider, Skeleton, TableSortLabel } from "@mui/material"
import SortIcon from "@mui/icons-material/Sort"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { RowRadioButtonsGroup } from "./common/RadioButtons"
import { formatDate } from "../utils/utils"

import type { ChangeEvent } from "react"
import type { SortQuery, Bill, Sponsor } from "../types/uiTypes"

type BillsTableProps = {
  tableHeaders: { label: string; sortable?: boolean }[]
  page: number
  rowsPerPage: number
  total: number
  bills: Bill[]
  loading?: boolean
  selectSetFavorites?: Bill[]
  favorites: Map<string, Bill>
  toggleSort: SortQuery | null
  billTypeOptions: string[]
  filteredBillType: string
  onRowClick?: (bill: Bill) => void
  handleOpen: (bill: Bill) => void
  toggleFavorite: (bill: Bill) => void
  toggleFilterMenu: () => void
  handleToggleSort?: (field: string, order: "asc" | "desc" | null) => void
  handleChangeRowsPerPage: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangePage: (_e: unknown, newPage: number) => void
  setFilteredBillType: (billType: string) => void
}

export const BillsTable = ({
  tableHeaders,
  page,
  rowsPerPage,
  total,
  bills,
  loading,
  favorites,
  toggleSort,
  billTypeOptions,
  filteredBillType,
  onRowClick,
  handleOpen,
  toggleFavorite,
  toggleFilterMenu,
  handleToggleSort,
  handleChangeRowsPerPage,
  handleChangePage,
  setFilteredBillType,
}: BillsTableProps) => {
  const directionOrder = toggleSort?.order === "asc" ? "asc" : "desc"

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
    <Paper elevation={8} sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer
        sx={{
          maxHeight: { xs: "calc(100vh - 350px)", sm: 440 },
          "& .MuiTableCell-stickyHeader": {
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            zIndex: 2,
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              {tableHeaders.map((item) => (
                <TableCell
                  key={item.label}
                  sortDirection={false}
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.sortable ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <SortIcon
                        fontSize="small"
                        sx={{
                          mr: 0.5,
                        }}
                      />
                      <TableSortLabel
                        onClick={() => {
                          handleToggleSort?.(item.label, directionOrder)
                        }}
                        active={item.label === toggleSort?.field}
                        direction={directionOrder}
                      >
                        {item.label}
                      </TableSortLabel>
                    </Box>
                  ) : (
                    item.label
                  )}
                </TableCell>
              ))}
              <TableCell
                align="left"
                onClick={() => {
                  toggleFilterMenu()
                }}
              >
                <FilterAltIcon
                  fontSize="large"
                  sx={{
                    cursor: "pointer",
                  }}
                />
              </TableCell>
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
                    <TableCell key={`s-${String(i)}-${header.label}`}>
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
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                  }}
                  key={bill.uri}
                  hover
                  role="button"
                  tabIndex={onRowClick ? 0 : -1}
                  onClick={() => handleOpen(bill)}
                >
                  <TableCell padding="normal" align="left">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(bill)
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
                    {bill.sponsors.length > 0 && formatSponsors(bill.sponsors)}
                  </TableCell>
                  <TableCell>{bill.billYear}</TableCell>
                  <TableCell>{`${formatDate(String(new Date(bill.lastUpdated)))}`}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />

      <Paper sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <TablePagination
            component="div"
            sx={{
              visibility: filteredBillType ? "hidden" : "visible",
              pointerEvents: filteredBillType ? "none" : "auto",
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
            count={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <RowRadioButtonsGroup
            billTypeOptions={billTypeOptions}
            filteredBillType={filteredBillType}
            setFilteredBillType={setFilteredBillType}
          />
        </Box>
      </Paper>
    </Paper>
  )
}
