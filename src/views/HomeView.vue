<template>
  <main class="min-h-screen pt-16">
    <section class="container mx-auto px-4 py-20">
      <div class="flex flex-col items-center justify-center text-center">
        <h1 class="text-5xl font-bold mb-6 animate__animated animate__fadeInDown">
          Hoş Geldiniz
        </h1>
        <p class="text-xl mb-8 max-w-2xl animate__animated animate__fadeIn animate__delay-1s">
          Ben bir full-stack web geliştiricisiyim. Modern ve kullanıcı dostu web uygulamaları geliştiriyorum.
        </p>
        <div class="flex gap-4 animate__animated animate__fadeInUp animate__delay-2s">
          <router-link to="/projects" class="btn-primary">
            Projelerimi Gör
          </router-link>
          <router-link to="/contact" class="btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
            İletişime Geç
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // GSAP animasyonları burada olacak
})
</script>