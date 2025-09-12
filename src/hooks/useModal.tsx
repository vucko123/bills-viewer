import { Dialog } from "@mui/material"
import { useState, type ReactNode } from "react"

export const useModal = (component: ReactNode) => {
  const [isOpen, setIsOpen] = useState(false)

  const Modal = () => {
    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        {component}
      </Dialog>
    )
  }

  return {
    Modal,
    openModal: () => setIsOpen(true),
  }
}
