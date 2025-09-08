import { IconButton, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

type ClearTooltipProps = {
  hasAnyFilter?: boolean
  onClick: () => void
}

export const ClearTooltip = ({ hasAnyFilter, onClick }: ClearTooltipProps) => {
  return (
    <Tooltip title="Clear all filters">
      <span>
        <IconButton
          disabled={!hasAnyFilter}
          onClick={onClick}
          sx={{
            fontSize: "12px",
            alignSelf: { xs: "flex-start", sm: "center" },
            mt: { xs: 1, sm: 0 },
          }}
        >
          <DeleteIcon />
          Clear Filters
        </IconButton>
      </span>
    </Tooltip>
  )
}
