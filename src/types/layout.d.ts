export interface LayoutConfig {
  preset: string
  primary: string
  surface: string|null
  darkTheme: boolean
  menuMode: string
}

export interface LayoutState {
  staticMenuDesktopInactive: boolean
  overlayMenuActive: boolean
  profileSidebarVisible: boolean
  configSidebarVisible: boolean
  staticMenuMobileActive: boolean
  menuHoverActive: boolean
  activeMenuItem: string|null
}
