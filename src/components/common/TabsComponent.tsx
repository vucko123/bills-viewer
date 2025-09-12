// TabsComponent.tsx
import { Tabs, Tab } from "@mui/material"
import type { ElementType, ReactElement, SyntheticEvent } from "react"
import { NavLink } from "react-router-dom"

export type TabItem = {
  label: string
  value: string
  icon?: ReactElement | string
  component?: ElementType
  to?: string
}

type TabsComponentProps = {
  value: string
  tabs: TabItem[]
  centered?: boolean
  variant?: "standard" | "scrollable" | "fullWidth"
  tabProps?: object
  onChange?: (_e: SyntheticEvent<Element>, newValue: string) => void
}

export const TabsComponent = ({
  value,
  onChange,
  tabs,
  centered = false,
  variant = "standard",
  tabProps = {},
}: TabsComponentProps) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      textColor="primary"
      indicatorColor="primary"
      centered={centered}
      variant={variant}
    >
      {tabs.map(({ label, value, icon, component, to }) => {
        const safeIcon = icon
        return (
          <Tab
            key={value}
            label={label}
            value={value}
            icon={safeIcon}
            iconPosition={safeIcon ? "start" : undefined}
            component={component ?? NavLink}
            to={to}
            {...tabProps}
          />
        )
      })}
    </Tabs>
  )
}
