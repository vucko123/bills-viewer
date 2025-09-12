import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import type { ChangeEvent } from "react"

type RadioButtonProps = {
  billTypeOptions: string[]
  billTypeFilter: string
  setBillTypeFilter: (billType: string) => void
}

export const RowRadioButtonsGroup = ({
  billTypeOptions,
  billTypeFilter,
  setBillTypeFilter,
}: RadioButtonProps) => {
  return (
    <FormControl>
      <RadioGroup
        row
        value={billTypeFilter || "Show All"}
        onChange={(_e: ChangeEvent<HTMLInputElement>, value) => {
          setBillTypeFilter(value === "Show All" ? "" : value)
        }}
      >
        <FormControlLabel
          value="Show All"
          control={<Radio />}
          label="Show All"
        />
        {billTypeOptions.length > 1 &&
          billTypeOptions.map((item) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio />}
              label={item}
            />
          ))}
      </RadioGroup>
    </FormControl>
  )
}
