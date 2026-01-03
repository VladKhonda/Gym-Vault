// Theme system for Colorful, Light, Dark

export const themes = {
  colorful: {
    name: 'colorful',
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    cardBg: '#ffffff',
    sidebarBg: '#1e293b',
    sidebarText: '#f1f5f9',
    sidebarHover: '#334155',
  },
  light: {
    name: 'light',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    cardBg: '#ffffff',
    sidebarBg: '#f3f4f6',
    sidebarText: '#111827',
    sidebarHover: '#e5e7eb',
  },
  dark: {
    name: 'dark',
    primary: '#60a5fa',
    secondary: '#818cf8',
    accent: '#a78bfa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    border: '#334155',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    cardBg: '#1e293b',
    sidebarBg: '#0f172a',
    sidebarText: '#f1f5f9',
    sidebarHover: '#334155',
  },
}

export const applyTheme = (themeName) => {
  const theme = themes[themeName] || themes.colorful
  const root = document.documentElement
  
  root.style.setProperty('--color-primary', theme.primary)
  root.style.setProperty('--color-secondary', theme.secondary)
  root.style.setProperty('--color-accent', theme.accent)
  root.style.setProperty('--color-background', theme.background)
  root.style.setProperty('--color-surface', theme.surface)
  root.style.setProperty('--color-text', theme.text)
  root.style.setProperty('--color-text-secondary', theme.textSecondary)
  root.style.setProperty('--color-border', theme.border)
  root.style.setProperty('--color-success', theme.success)
  root.style.setProperty('--color-warning', theme.warning)
  root.style.setProperty('--color-error', theme.error)
  root.style.setProperty('--color-card-bg', theme.cardBg)
  root.style.setProperty('--color-sidebar-bg', theme.sidebarBg)
  root.style.setProperty('--color-sidebar-text', theme.sidebarText)
  root.style.setProperty('--color-sidebar-hover', theme.sidebarHover)
}

