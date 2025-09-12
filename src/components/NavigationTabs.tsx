import { Box, useMediaQuery, useTheme } from "@mui/material"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { CustomizedSwitches } from "../theme/ThemeChage"
import DescriptionIcon from "@mui/icons-material/Description"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { TabsComponent } from "./common/TabsComponent"

export const NavigationTabs = () => {
  const { pathname } = useLocation()
  const value = pathname.includes("/bills/favorites") ? "favorites" : "all"

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
      icon:
        value === "favorites" ? (
          <StarIcon fontSize="small" />
        ) : (
          <StarBorderIcon fontSize="small" />
        ),
      component: NavLink,
      to: "favorites",
    },
  ]

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
          value={value}
          tabs={tabs}
          centered={!isMobile}
          variant={isMobile ? "scrollable" : "standard"}
          tabProps={{
            sx: {
              minHeight: 46,
              px: { xs: 1.25, sm: 2.5 },
            },
          }}
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
