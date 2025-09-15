import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import type { ChangeEvent } from "react"
import { Tooltip } from "@mui/material"

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
        <Tooltip title="Show All Bills">
          <FormControlLabel
            value="Show All"
            control={<Radio />}
            label="Show All"
          />
        </Tooltip>
        {billTypeOptions.length > 1 &&
          billTypeOptions.map((item) => (
            <Tooltip
              title={`Filter All ${item} Bills for this page`}
              key={`billtype-${item}`}
            >
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio />}
                label={item}
              />
            </Tooltip>
          ))}
      </RadioGroup>
    </FormControl>
  )
}
