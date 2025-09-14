import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TablePagination from "@mui/material/TablePagination"
import { Box, Divider } from "@mui/material"
import { RowRadioButtonsGroup } from "./common/RadioButtons"

import type { ChangeEvent } from "react"
import type { Bill } from "../types/billTypes"
import { DataTableHeader } from "./common/table/DataTableHeader"
import { DataTableBody } from "./common/table/DataTableBody"
import type { SortQuery, TableColumnProps } from "../hooks/useBillsTable"

type BillsTableProps = {
  tableColumns: TableColumnProps[]
  page: number
  rowsPerPage: number
  totalResults: number
  bills: Bill[]
  isLoading?: boolean
  selectSetFavorites?: Bill[]
  favorites: Map<string, Bill>
  sortState: SortQuery | null
  billTypeOptions: string[]
  billTypeFilter: string
  onRowClick?: (bill: Bill) => void
  openLanguageModal: (bill: Bill) => void
  toggleAddFavorite: (bill: Bill) => void
  onOpenFilterMenu: () => void
  handleSortStateToggle?: (field: string, order: "asc" | "desc" | null) => void
  handleChangeRowsPerPage: (e: ChangeEvent<HTMLInputElement>) => void
  paginationPageChange: (_e: unknown, newPage: number) => void
  setBillTypeFilter: (billType: string) => void
}

export const BillsTable = ({
  tableColumns,
  page,
  rowsPerPage,
  totalResults,
  bills,
  isLoading,
  favorites,
  sortState,
  billTypeOptions,
  billTypeFilter,
  onRowClick,
  openLanguageModal,
  toggleAddFavorite,
  onOpenFilterMenu,
  handleSortStateToggle,
  handleChangeRowsPerPage,
  paginationPageChange,
  setBillTypeFilter,
}: BillsTableProps) => {
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
          <DataTableHeader
            onOpenFilterMenu={onOpenFilterMenu}
            sortState={sortState}
            tableColumns={tableColumns}
            handleSortStateToggle={handleSortStateToggle}
          />

          <DataTableBody
            data={bills}
            tableColumns={tableColumns}
            isLoading={isLoading ?? true}
            openLanguageModal={openLanguageModal}
            toggleAddFavorite={toggleAddFavorite}
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
              visibility: billTypeFilter ? "hidden" : "visible",
              pointerEvents: billTypeFilter ? "none" : "auto",
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
            count={totalResults}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={paginationPageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <RowRadioButtonsGroup
            billTypeOptions={billTypeOptions}
            billTypeFilter={billTypeFilter}
            setBillTypeFilter={setBillTypeFilter}
          />
        </Box>
      </Paper>
    </Paper>
  )
}
