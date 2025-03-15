import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light'
  }),
  actions: {
    setTheme(newTheme) {
      this.theme = newTheme
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    },
    toggleTheme() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    }
  }
})