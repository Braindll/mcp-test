<template>
  <nav class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="text-xl font-bold">
          Portfolio
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            active-class="text-blue-600 dark:text-blue-400"
          >
            {{ item.name }}
          </router-link>
          <button
            @click="themeStore.toggleTheme()"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            :title="themeStore.theme === 'dark' ? 'Açık tema' : 'Karanlık tema'"
          >
            <span v-if="themeStore.theme === 'dark'">☀️</span>
            <span v-else>🌙</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMenuOpen"
      class="md:hidden border-t border-gray-200 dark:border-gray-800"
    >
      <div class="container mx-auto px-4 py-4 space-y-4">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          active-class="text-blue-600 dark:text-blue-400"
          @click="isMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
        <button
          @click="themeStore.toggleTheme()"
          class="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {{ themeStore.theme === 'dark' ? 'Açık Tema' : 'Karanlık Tema' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()
const isMenuOpen = ref(false)

const menuItems = [
  { name: 'Ana Sayfa', path: '/' },
  { name: 'Projeler', path: '/projects' },
  { name: 'Hakkımda', path: '/about' },
  { name: 'İletişim', path: '/contact' },
  { name: 'Animasyon Demo', path: '/animation-demo' },
  { name: 'Metin Animatör', path: '/text-animator' }
]
</script>