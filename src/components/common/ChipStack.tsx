import { Chip, Stack } from "@mui/material"

export const ChipStack = ({ filters }: { filters: string[] }) => {
  return (
    <Stack direction="row" spacing={1} padding={1}>
      {filters.map((filter) => (
        <Chip key={filter} label={filter} variant="outlined" />
      ))}
    </Stack>
  )
}
