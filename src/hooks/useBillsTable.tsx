import { useState, type ChangeEvent } from "react"
import { BillsTable } from "../components/BillsTable"
import { useFavoritesStore } from "../store/favorites"
import { Box } from "@mui/material"
import { useBillsData } from "./useBillsData"
import { FilterMenu } from "../components/FilterMenu"
import { ChipStack } from "../components/common/ChipStack"
import { ClearTooltip } from "../components/common/ClearTooltip"
import { stringifyQueryKey } from "../utils/utils"
import { useModal } from "./useModal"
import { LanguageModal } from "../components/LanguageModal"

import type { Bill } from "../types/billTypes"

export type SelectedBillTitles = {
  titleEn: string
  titleGa: string
}

export type SortQuery = {
  field: string
  order: "asc" | "desc" | null
}

export type FiltersOption = {
  billStatus?: string[]
  billYear?: string
  lastUpdated?: string
  fromDate?: string
  toDate?: string
}

const tableHeaders: { label: string; sortable?: boolean }[] = [
  { label: "Bill Number", sortable: true },
  { label: "Bill Type", sortable: false },
  { label: "Bill Status", sortable: false },
  { label: "Sponsor", sortable: false },
  { label: "Bill Year", sortable: true },
  { label: "Last Updated", sortable: true },
]

const BillStatusFilters = [
  "Current",
  "Withdrawn",
  "Enacted",
  "Rejected",
  "Defeated",
  "Lapsed",
] as const

const INITIAL_FILTERS: FiltersOption = {
  billStatus: [],
  billYear: "",
  lastUpdated: "",
  fromDate: "",
  toDate: "",
}

export const useBillsTable = ({ isFavorites }: { isFavorites: boolean }) => {
  // state management for poppers
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [selectedBillTitles, setSelectedBillTitles] =
    useState<SelectedBillTitles>({
      titleEn: "",
      titleGa: "",
    })

  // state management for Pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // state management for sorting
  const [toggleSort, setToggleSort] = useState<SortQuery | null>({
    field: "",
    order: null,
  })

  const [stringifiedFiltersQueryKey, setStringifiedFiltersQueryKey] =
    useState<string>(stringifyQueryKey(INITIAL_FILTERS))
  const [filterOptions, setFilterOptions] =
    useState<FiltersOption>(INITIAL_FILTERS)
  const [chipFilters, setChipFilters] = useState<string[]>([])

  const [filteredBillType, setFilteredBillType] = useState("")

  const favorites = useFavoritesStore((state) => state.favorites)
  const toggleAddFavorite = useFavoritesStore(
    (state) => state.toggleAddFavorite,
  )

  const { Modal, openModal } = useModal(
    <LanguageModal selectedBillTitles={selectedBillTitles} />,
  )

  // handle modal open/close and set selected bill title
  const handleOpenLanguageModal = (bill: Bill) => {
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
    openModal()
  }

  const toggleFilterMenuOpen = () => {
    setFilterMenuOpen(!filterMenuOpen)
  }

  const handlePaginationPageChange = (_e: unknown, newPage: number): void => {
    setCurrentPage(newPage)
  }

  const handlePaginationChangeRowsPerPage = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    setRowsPerPage(Number(e.target.value))
    setCurrentPage(0)
  }

  const changeBillStatus = (billStatus: string) => {
    setFilterOptions((state) => {
      const newState = { ...state }
      const current = state.billStatus ?? []
      newState.billStatus = current.includes(billStatus)
        ? current.filter((value) => value !== billStatus)
        : [...current, billStatus]

      return newState
    })
  }

  const onChangeFilters = (selectedOptions: FiltersOption) => {
    setFilterOptions((state) => {
      const newState = { ...state }

      if (selectedOptions.billStatus) {
        changeBillStatus(selectedOptions.billStatus[0])
      }

      if (selectedOptions.billYear !== undefined) {
        newState.billYear = selectedOptions.billYear ?? ""
      }
      if (selectedOptions.lastUpdated !== undefined) {
        newState.lastUpdated = selectedOptions.lastUpdated ?? ""
      }
      if (selectedOptions.fromDate !== undefined) {
        newState.fromDate = selectedOptions.fromDate ?? ""
      }
      if (selectedOptions.toDate !== undefined) {
        newState.toDate = selectedOptions.toDate ?? ""
      }

      return newState
    })
  }

  const { bills, total, isFetching, billTypeOptions } = useBillsData({
    isFavorites,
    page: currentPage,
    rowsPerPage,
    filteredBillByStatus: filterOptions.billStatus || [],
    filterQuery: filterOptions,
    filteredBillType,
    sortQuery: {
      field: toggleSort?.field || "",
      order: toggleSort?.order || null,
    },
    stringifiedApiQueryKey: stringifiedFiltersQueryKey,
  })

  const hasAnyFilter = Object.values(filterOptions).some(
    (value) =>
      (Array.isArray(value) && value.length > 0) ||
      (!Array.isArray(value) && value),
  )

  const clearFilters = () => {
    setFilterOptions(INITIAL_FILTERS)
    setCurrentPage(0)
    setStringifiedFiltersQueryKey(stringifyQueryKey(INITIAL_FILTERS))
    setFilterMenuOpen(false)
    setChipFilters([])
    setFilteredBillType("")
  }

  const appyFiltersAndHashQueryKey = () => {
    setCurrentPage(0)
    setFilteredBillType("")
    setStringifiedFiltersQueryKey(stringifyQueryKey(filterOptions))
  }
  const handleToggleSort = (field: string, order: "asc" | "desc" | null) => {
    setToggleSort((prev) => {
      if (prev?.field === field) {
        const newOrder = prev.order === "asc" ? "desc" : "asc"
        return { field, order: newOrder }
      }
      return { field, order }
    })
  }

  return (
    <>
      <Modal />
      {filterMenuOpen && (
        <FilterMenu
          setChipFilters={setChipFilters}
          hasAnyFilter={hasAnyFilter}
          clearFilters={clearFilters}
          appyFiltersAndHashQueryKey={appyFiltersAndHashQueryKey}
          onChangeFilters={onChangeFilters}
          filterOptions={filterOptions}
          checkboxList={Object.values(BillStatusFilters)}
          open={filterMenuOpen}
          onOpen={() => setFilterMenuOpen(true)}
          onClose={() => setFilterMenuOpen(false)}
        />
      )}

      {chipFilters.length > 0 && (
        <Box
          sx={{
            display: "flex",

            overflowX: "auto",
            gap: { xs: 1, sm: 2 },
            alignItems: { xs: "center", sm: "center" },
            mb: 1,
          }}
        >
          <ChipStack filters={chipFilters} />
          <ClearTooltip
            onClick={clearFilters ?? (() => {})}
            hasAnyFilter={hasAnyFilter}
          />
        </Box>
      )}

      <BillsTable
        setFilteredBillType={setFilteredBillType}
        filteredBillType={filteredBillType}
        billTypeOptions={billTypeOptions}
        toggleSort={toggleSort}
        handleToggleSort={handleToggleSort}
        toggleFilterMenu={toggleFilterMenuOpen}
        handleOpen={handleOpenLanguageModal}
        tableHeaders={tableHeaders}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        total={total}
        bills={bills}
        loading={isFetching}
        handleChangePage={handlePaginationPageChange}
        handleChangeRowsPerPage={handlePaginationChangeRowsPerPage}
        toggleFavorite={(bill) => toggleAddFavorite(bill)}
        favorites={favorites}
      />
    </>
  )
}
