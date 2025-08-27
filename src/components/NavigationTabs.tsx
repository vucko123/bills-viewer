import { Tabs, Tab, Box } from "@mui/material"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { CustomizedSwitches } from "./ThemeChage"

export const NavigationTabs = () => {
  const { pathname } = useLocation()
  const value = pathname.includes("/bills/favorites") ? "favorites" : "all"

  return (
    <Box sx={{ p: 1 }}>
      <Tabs
        sx={{
          display: "flex",
        }}
        value={value}
        aria-label="Bills navigation"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="All Bills" value="all" component={NavLink} to="all" />
        <Tab
          label="Favorites"
          value="favorites"
          component={NavLink}
          to="favorites"
        />
        <CustomizedSwitches />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
