import { Tabs, Tab, Box, useMediaQuery, useTheme } from "@mui/material"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { CustomizedSwitches } from "../theme/ThemeChage"
import DescriptionIcon from "@mui/icons-material/Description"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"

export const NavigationTabs = () => {
  const { pathname } = useLocation()
  const value = pathname.includes("/bills/favorites") ? "favorites" : "all"

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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

        <Tabs
          value={value}
          aria-label="Bills navigation"
          textColor="primary"
          indicatorColor="primary"
          centered={!isMobile}
          variant={isMobile ? "scrollable" : "standard"}
          sx={{
            justifySelf: "center",
            maxWidth: "100%",
            "& .MuiTab-root": {
              minHeight: 46,
              px: { xs: 1.25, sm: 2.5 },
            },
          }}
        >
          <Tab
            label="All Bills"
            value="all"
            component={NavLink}
            to="all"
            icon={<DescriptionIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab
            icon={
              value === "favorites" ? (
                <StarIcon fontSize="small" />
              ) : (
                <StarBorderIcon fontSize="small" />
              )
            }
            label="Favorites"
            value="favorites"
            component={NavLink}
            to="favorites"
            iconPosition="start"
          />
        </Tabs>

        <Box sx={{ justifySelf: "end" }}>
          <CustomizedSwitches />
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
