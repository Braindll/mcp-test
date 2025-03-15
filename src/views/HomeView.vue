<template>
  <main class="min-h-screen pt-16">
    <section class="container mx-auto px-4 py-20">
      <div class="flex flex-col items-center justify-center text-center">
        <AnimatedText 
          text="Hoş Geldiniz" 
          :duration="1.5" 
          :stagger="0.05"
          class="mb-6"
        />
        
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
import AnimatedText from '../components/AnimatedText.vue'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  // Sayfa yüklendiğinde ek GSAP animasyonları
  gsap.from('.animate-on-scroll', {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.animate-on-scroll',
      start: 'top 80%',
    }
  })
})
</script>