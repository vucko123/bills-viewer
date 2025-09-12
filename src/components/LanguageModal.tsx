import { DialogContent, DialogContentText, Tab, Tabs } from "@mui/material"
import { paragraphToText } from "../utils/utils"
import { useState } from "react"
import type { SelectedBillTitles } from "../hooks/useBillsTable"

type Lang = "English" | "Gaeilge"

export const LanguageModal = ({
  selectedBillTitles,
}: {
  selectedBillTitles: SelectedBillTitles
}) => {
  const [language, setLanguage] = useState("English")
  return (
    <>
      <Tabs
        value={language}
        textColor="primary"
        indicatorColor="primary"
        onChange={(_event, newValue: Lang) => {
          setLanguage(newValue)
        }}
      >
        <Tab label="English" value="English" />
        <Tab label="Gaeilge" value="Gaeilge" />
      </Tabs>

      <DialogContent>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {paragraphToText(
            language === "English"
              ? selectedBillTitles.titleEn
              : selectedBillTitles.titleGa,
          )}
        </DialogContentText>
      </DialogContent>
    </>
  )
}
