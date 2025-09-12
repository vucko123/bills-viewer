import { DialogContent, DialogContentText } from "@mui/material"
import { useState, type ChangeEvent, type SyntheticEvent } from "react"
import { paragraphToText } from "../utils/utils"
import type { SelectedBillTitles } from "../hooks/useBillsTable"
import { TabsComponent } from "./common/TabsComponent"

export const LanguageModal = ({
  selectedBillTitles,
}: {
  selectedBillTitles: SelectedBillTitles
}) => {
  const [language, setLanguage] = useState<string>("English")
  const tabs = [
    { label: "English", value: "English" },
    { label: "Gaeilge", value: "Gaeilge" },
  ]

  return (
    <>
      <TabsComponent
        value={language}
        onChange={(_e: SyntheticEvent<Element>, newValue) =>
          setLanguage(newValue)
        }
        tabs={tabs}
      />

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
