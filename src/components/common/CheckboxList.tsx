import { Checkbox, FormControlLabel } from "@mui/material"

type CheckboxListProps = {
  values: string[]
  onChange?: (value: string) => void
  selectedValues?: string[]
}

export const CheckboxList = ({
  values,
  selectedValues,
  onChange,
}: CheckboxListProps) => (
  <>
    {values.map((value) => (
      <FormControlLabel
        key={value}
        control={
          <Checkbox
            checked={selectedValues?.includes(value)}
            onChange={() => onChange?.(value)}
          />
        }
        label={value}
      />
    ))}
  </>
)
