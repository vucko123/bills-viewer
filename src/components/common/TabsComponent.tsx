import { Tabs, Tab, type SxProps } from "@mui/material"
import type { ElementType, ReactElement, SyntheticEvent } from "react"
import { NavLink } from "react-router-dom"

export type TabItem = {
  label: string
  value: string
  icon?: ReactElement
  component?: ElementType
  to?: string
}

type TabsComponentProps = {
  tabs: TabItem[]
  selectedTab: string
  centered?: boolean
  tabStyles?: SxProps
  onTabChange?: (_e: SyntheticEvent<Element>, selectedTab: string) => void
}

export const TabsComponent = ({
  selectedTab,
  tabs,
  tabStyles = {},
  onTabChange,
}: TabsComponentProps) => {
  return (
    <Tabs
      value={selectedTab}
      onChange={onTabChange}
      textColor="primary"
      indicatorColor="primary"
      variant="scrollable"
    >
      {tabs.map(({ label, value, icon, component, to }) => {
        return (
          <Tab
            key={value}
            label={label}
            value={value}
            icon={icon}
            iconPosition={icon ? "start" : undefined}
            component={component ?? NavLink}
            to={to}
            {...tabStyles}
          />
        )
      })}
    </Tabs>
  )
}
