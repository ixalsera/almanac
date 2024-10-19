import { computed, reactive, readonly } from 'vue'
import type { LayoutConfig, LayoutState } from '@/types/layout'

const layoutConfig = reactive<LayoutConfig>({
  preset: 'Aura',
  primary: 'emerald',
  surface: null,
  darkTheme: false,
  menuMode: 'static',
})

const layoutState = reactive<LayoutState>({
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
  activeMenuItem: null,
})

export function useLayout() {
  const setPrimary = (value: string) => {
    layoutConfig.primary = value
  }

  const setSurface = (value: string) => {
    layoutConfig.surface = value
  }

  const setPreset = (value: string) => {
    layoutConfig.preset = value
  }

  const setActiveMenuItem = item => {
    layoutState.activeMenuItem = item.value || item
  }

  const setMenuMode = (mode: string) => {
    layoutConfig.menuMode = mode
  }

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle()

      return
    }

    document.startViewTransition(() => executeDarkModeToggle(event))
  }

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme
    document.documentElement.classList.toggle('app-dark')
  }

  const onMenuToggle = () => {
    if (layoutConfig.menuMode === 'overlay') {
      layoutState.overlayMenuActive = !layoutState.overlayMenuActive
    }

    if (window.innerWidth > 991) {
      layoutState.staticMenuDesktopInactive =
        !layoutState.staticMenuDesktopInactive
    } else {
      layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive
    }
  }

  const resetMenu = () => {
    layoutState.overlayMenuActive = false
    layoutState.staticMenuMobileActive = false
    layoutState.menuHoverActive = false
  }

  const isSidebarActive = computed(
    () => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive,
  )

  const isDarkTheme = computed(() => layoutConfig.darkTheme)

  const getPrimary = computed(() => layoutConfig.primary)

  const getSurface = computed(() => layoutConfig.surface)

  return {
    layoutConfig: readonly(layoutConfig),
    layoutState: readonly(layoutState),
    onMenuToggle,
    isSidebarActive,
    isDarkTheme,
    getPrimary,
    getSurface,
    setActiveMenuItem,
    toggleDarkMode,
    setPrimary,
    setSurface,
    setPreset,
    resetMenu,
    setMenuMode,
  }
}
