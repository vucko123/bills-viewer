import { Box } from "@mui/material"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { CustomizedSwitches } from "../theme/ThemeChage"
import DescriptionIcon from "@mui/icons-material/Description"
import StarIcon from "@mui/icons-material/Star"
import { TabsComponent } from "./common/TabsComponent"

const tabs = [
  {
    label: "All Bills",
    value: "all",
    icon: <DescriptionIcon fontSize="small" />,
    component: NavLink,
    to: "all",
  },
  {
    label: "Favorites",
    value: "favorites",
    icon: <StarIcon fontSize="small" />,
    component: NavLink,
    to: "favorites",
  },
]

export const NavigationTabs = () => {
  const { pathname } = useLocation()
  const selected = pathname.includes("/bills/favorites") ? "favorites" : "all"

  return (
    <Box sx={{ p: 1 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr auto", sm: "1fr auto 1fr" },
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }} />
        <TabsComponent
          tabs={tabs}
          selectedTab={selected}
          tabStyles={{ px: { xs: 1.25, sm: 2.5 } }}
        />
        <Box sx={{ justifySelf: "end" }}>
          <CustomizedSwitches />
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
