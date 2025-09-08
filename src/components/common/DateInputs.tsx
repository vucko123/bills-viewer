import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"

type DateInputsProps = {
  label: string
  currentValue?: string
  format: "YYYY" | "YYYY-MM-DD" | "DD/MM/YYYY"
  views?: "year" | ("year" | "month" | "day")[]
  onChange?: (newValue: string | null) => void
}

export const DateInputs = ({
  label,
  format,
  views,
  currentValue,
  onChange,
}: DateInputsProps) => {
  const currentYear = dayjs()
  const normalizedViews = Array.isArray(views) ? views : [views ?? "year"]

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={currentValue ? dayjs(currentValue) : null}
        maxDate={currentYear}
        label={label}
        views={normalizedViews}
        onChange={(newValue) => {
          onChange?.(newValue ? newValue.format(format) : null)
        }}
        slotProps={{
          actionBar: { actions: ["clear"] },
          popper: {
            sx: {
              "& .MuiPickersLayout-contentWrapper": {
                width: "250px",
                maxWidth: "none",
              },
              "& .MuiDateCalendar-root": {
                width: "100%",
                maxWidth: "none",
              },
              "& .MuiYearCalendar-root": {
                width: "100%",
              },
              "& .MuiPickersLayout-root": {
                height: "auto",
              },
              "& .MuiDialogActions-root": {
                mt: -10,
              },
            },
          },
          textField: {
            placeholder: format,
          },
        }}
      />
    </LocalizationProvider>
  )
}
