import { useState } from "react"
import { BillsTable } from "../components/BillsTable"
import { MultipleSelectFilter } from "../components/MultipleSelectFilter"
import { TransitionsModal } from "../components/Modal"
import type { Bill } from "../types/billTypes"
import { useFavoritesStore } from "../store/favorites"
import { Box } from "@mui/material"
import { SelectType } from "../components/SelectType"
import { useBillsData } from "./useBillsData"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import DeleteIcon from "@mui/icons-material/Delete"

const tableHeaders = ["Bill number", "Bill Type", "Bill Status", "Sponsor"]

export type SelectedBill = {
  titleEn: string
  titleGa: string
}

export const useBillsTable = ({ isFavorites }: { isFavorites: boolean }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [selectedBillTitles, setSelectedBillTitles] = useState<SelectedBill>({
    titleEn: "",
    titleGa: "",
  })
  const [filteredBillByStatus, setFilteredBillByStatus] = useState<string[]>([])
  const [filteredBillType, setFilteredBillType] = useState("")

  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  // handle modal open/close and set selected bill title
  const handleOpen = (bill: Bill) => {
    if (!bill.longTitleEn) {
      setSelectedBillTitles((state) => ({
        ...state,
        titleEn: "No English title available",
      }))
    }
    if (!bill.longTitleGa) {
      setSelectedBillTitles((state) => ({
        ...state,
        titleGa: "Níl teideal Gaeilge ar fáil",
      }))
    } else {
      setSelectedBillTitles((state) => ({
        ...state,
        titleEn: bill.longTitleEn,
        titleGa: bill.longTitleGa,
      }))
    }
    setOpenModal(true)
  }
  const handleClose = () => setOpenModal(false)

  const { bills, total, billTypeOptions, isFetching } = useBillsData({
    isFavorites,
    page: currentPage,
    rowsPerPage,
    filteredBillByStatus,
    filteredBillType,
  })
  const hasAnyFilter = filteredBillByStatus.length > 0 || !!filteredBillType

  return (
    <>
      {openModal && (
        <TransitionsModal
          handleClose={handleClose}
          open={openModal}
          selectedBill={selectedBillTitles}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 2 },
          alignItems: { xs: "stretch", sm: "center" },
          mb: 1,
        }}
      >
        <MultipleSelectFilter
          filteredBillByStatus={filteredBillByStatus}
          setFilteredBillByStatus={setFilteredBillByStatus}
        />

        <SelectType
          billTypeOptions={billTypeOptions}
          filteredBillType={filteredBillType}
          onChange={setFilteredBillType}
        />
        <Tooltip title="Clear all filters">
          <span>
            <IconButton
              aria-label="clear filters"
              onClick={() => {
                setFilteredBillByStatus([])
                setFilteredBillType("")
                setCurrentPage(0)
              }}
              disabled={!hasAnyFilter}
              sx={{
                fontSize: "12px",
                alignSelf: { xs: "flex-start", sm: "center" },
                mt: { xs: 1, sm: 0 },
              }}
            >
              <DeleteIcon />
              Clear Filters
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <BillsTable
        handleOpen={handleOpen}
        tableHeaders={tableHeaders}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        total={total}
        bills={bills}
        loading={isFetching}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
        toggleFavorite={(bill) => toggleFavorite(bill)}
        favorites={favorites}
      />
    </>
  )
}
