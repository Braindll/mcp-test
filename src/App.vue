<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <TheNavigation />

    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import TheNavigation from './components/TheNavigation.vue'

const themeStore = useThemeStore()

onMounted(() => {
  // Tema kontrolü
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  themeStore.setTheme(isDark ? 'dark' : 'light')
})
</script>