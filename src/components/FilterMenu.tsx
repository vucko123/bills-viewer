import Box from "@mui/material/Box"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import { CheckboxList } from "./common/CheckboxList"
import { DateInputs } from "./common/DateInputs"
import { ClearTooltip } from "./common/ClearTooltip"
import { convertFiltersToArray } from "../utils/utils"
import dayjs from "dayjs"

import type { FiltersOption } from "../types/uiTypes"

type FilterMenuProps = {
  filterOptions?: FiltersOption
  checkboxList?: string[]
  open: boolean
  hasAnyFilter?: boolean
  onChangeFilters: (selectedOptions: FiltersOption) => void
  onClose: () => void
  onOpen?: () => void
  clearFilters?: () => void
  appyFiltersAndHashQueryKey: () => void
  setChipFilters: (filters: string[]) => void
}

export const FilterMenu = ({
  open,
  checkboxList,
  filterOptions,
  hasAnyFilter,
  onChangeFilters,
  onClose,
  onOpen,
  clearFilters,
  appyFiltersAndHashQueryKey,
  setChipFilters,
}: FilterMenuProps) => {
  const list = () => (
    <Box sx={{ width: 290, p: 2 }} role="presentation">
      <List>
        Bill Status
        <Divider />
        <CheckboxList
          values={checkboxList ?? []}
          selectedValues={filterOptions?.billStatus ?? []}
          onChange={(value) => onChangeFilters({ billStatus: [value] })}
        />
      </List>
      <Divider />
      <List>
        {`Bill Year:`}
        <Divider sx={{ mb: 1 }} />
        <DateInputs
          currentValue={filterOptions?.billYear}
          label="Bill Year"
          format="YYYY"
          views="year"
          onChange={(date) => {
            onChangeFilters({
              billYear: date ?? "",
            })
          }}
        />
      </List>
      <Divider />

      <List>
        {`Last Updated:`}
        <Divider sx={{ mb: 1 }} />
        <DateInputs
          currentValue={filterOptions?.lastUpdated}
          label="last Updated"
          format="YYYY-MM-DD"
          views={["day", "month", "year"]}
          onChange={(date) =>
            onChangeFilters({
              lastUpdated: date ? dayjs(date).format("YYYY-MM-DD") : "",
            })
          }
        />
      </List>

      <Divider />

      <List>
        {`From Date:`}
        <Divider sx={{ mb: 1 }} />
        <DateInputs
          currentValue={filterOptions?.fromDate}
          label="From Date "
          format="YYYY-MM-DD"
          views={["day", "month", "year"]}
          onChange={(date) =>
            onChangeFilters({
              fromDate: date ? dayjs(date).format("YYYY-MM-DD") : "",
            })
          }
        />
      </List>
      <Divider />

      <List>
        {`To Date:`}
        <Divider sx={{ mb: 1 }} />
        <DateInputs
          currentValue={filterOptions?.toDate}
          label="To Date"
          format="YYYY-MM-DD"
          views={["day", "month", "year"]}
          onChange={(date) =>
            onChangeFilters({
              toDate: date ? dayjs(date).format("YYYY-MM-DD") : "",
            })
          }
        />
      </List>
      <Divider />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          setChipFilters(convertFiltersToArray(filterOptions ?? {}))
          appyFiltersAndHashQueryKey()
          onClose()
        }}
      >
        Apply Filters
      </Button>
      <ClearTooltip
        onClick={clearFilters ?? (() => {})}
        hasAnyFilter={hasAnyFilter}
      />
    </Box>
  )

  return (
    <div>
      <>
        <SwipeableDrawer
          transitionDuration={{ enter: 500, exit: 500 }}
          anchor="left"
          open={open}
          onClose={onClose}
          onOpen={onOpen ?? (() => {})}
        >
          {list()}
        </SwipeableDrawer>
      </>
    </div>
  )
}
