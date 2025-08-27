import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { type SelectChangeEvent } from "@mui/material/Select"

type SelectType = {
  label?: string
  billTypeOptions: string[]
  filteredBillType: string
  onChange: (val: string) => void
}

export const SelectType: React.FC<SelectType> = ({
  label = "Bill Type",
  billTypeOptions: options,
  filteredBillType: value,
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string)
  }

  return (
    <Box>
      <FormControl
        sx={{
          m: 1,
          flex: 1,
          minWidth: 300,
          maxWidth: { xs: "100%", sm: "100%" },
        }}
      >
        <InputLabel id="bill-type-label">{label}</InputLabel>
        <Select
          labelId="bill-type-label"
          id="bill-type"
          value={options.includes(value) ? value : ""}
          label={label}
          onChange={handleChange}
        >
          {options.length > 0 ? (
            options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              No options available
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  )
}
