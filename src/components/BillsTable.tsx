import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import { Box, Divider } from "@mui/material"
import { RowRadioButtonsGroup } from "./common/RadioButtons"

import type { ChangeEvent } from "react"
import type { Bill } from "../types/billTypes"
import { TableHeader } from "./common/table/TableHeader"
import { DataTableBody } from "./common/table/DataTableBody"
import type { SortQuery } from "../hooks/useBillsTable"

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
  total, // totalResults
  bills,
  loading, // isLoading
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
          <TableHeader
            toggleFilterMenu={toggleFilterMenu}
            directionOrder={directionOrder}
            toggleSort={toggleSort}
            tableHeaders={tableHeaders}
            handleToggleSort={handleToggleSort}
          />

          <DataTableBody
            data={bills}
            tableHeaders={tableHeaders}
            loading={loading ?? true}
            handleOpen={handleOpen}
            toggleFavorite={toggleFavorite}
            onRowClick={onRowClick}
            favorites={favorites}
          />
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
