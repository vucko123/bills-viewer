import { useState, type JSX } from "react"
import { Tab, Tabs } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import { paragraphToText } from "../utils/utils"
import type { SelectedBill } from "../hooks/useBillsTable"

type Lang = "English" | "Gaeilge"

export const TransitionsModal = ({
  handleClose,
  open,
  selectedBill,
}: {
  handleClose: () => void
  open: boolean
  selectedBill: SelectedBill
}): JSX.Element => {
  const [value, setValue] = useState<Lang>("English")

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <Tabs
        value={value}
        textColor="primary"
        indicatorColor="primary"
        onChange={(_event, newValue: Lang) => {
          setValue(newValue)
        }}
      >
        <Tab label="English" value="English" />
        <Tab label="Gaeilge" value="Gaeilge" />
      </Tabs>

      <DialogContent>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {paragraphToText(
            value === "English" ? selectedBill.titleEn : selectedBill.titleGa,
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
