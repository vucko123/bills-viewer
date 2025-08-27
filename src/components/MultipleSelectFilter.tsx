import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import ListItemText from "@mui/material/ListItemText"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const Menu = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const filterOptions = [
  "Current",
  "Withdrawn",
  "Enacted",
  "Rejected",
  "Defeated",
  "Lapsed",
]

type MultipleSelectFilter = {
  filteredBillByStatus?: string[]
  setFilteredBillByStatus?: (filters: string[]) => void
}

export const MultipleSelectFilter = ({
  setFilteredBillByStatus: setFilteredBillTypes,
  filteredBillByStatus: filteredBillTypes,
}: MultipleSelectFilter) => {
  const handleChange = (e: SelectChangeEvent<typeof filteredBillTypes>) => {
    const {
      target: { value },
    } = e
    setFilteredBillTypes?.(
      typeof value === "string" ? value.split(",") : (value ?? []),
    )
  }

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          flex: 1,
          minWidth: 300,
          maxWidth: { xs: "100%", sm: "100%" },
        }}
      >
        <InputLabel id="demo-multiple-checkbox-label">Bill Status</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={filteredBillTypes}
          onChange={(e) => {
            handleChange(e)
          }}
          input={<OutlinedInput label="Bill Status" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={Menu}
        >
          {filterOptions.map((filter) => (
            <MenuItem key={filter} value={filter}>
              <Checkbox checked={(filteredBillTypes ?? []).includes(filter)} />
              <ListItemText primary={filter} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
