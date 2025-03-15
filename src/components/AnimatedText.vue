<template>
  <div class="animated-text-container">
    <h1 ref="textContainer" class="text-4xl md:text-6xl font-bold text-center">
      <span 
        v-for="(char, index) in characters" 
        :key="index" 
        class="inline-block opacity-0"
        :ref="el => { if (el) charElements[index] = el }"
      >
        {{ char }}
      </span>
    </h1>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  text: {
    type: String,
    required: true,
    default: 'Merhaba Dünya'
  },
  duration: {
    type: Number,
    default: 1.5
  },
  stagger: {
    type: Number,
    default: 0.05
  }
})

const textContainer = ref(null)
const charElements = ref([])

const characters = computed(() => {
  return props.text.split('')
})

onMounted(() => {
  // Animasyon için GSAP timeline oluştur
  const tl = gsap.timeline()
  
  // Yönler dizisi (üst, sağ, alt, sol, sağ üst, sağ alt, sol üst, sol alt)
  const directions = [
    { x: 0, y: -100 },    // üst
    { x: 100, y: 0 },     // sağ
    { x: 0, y: 100 },     // alt
    { x: -100, y: 0 },    // sol
    { x: 100, y: -100 },  // sağ üst
    { x: 100, y: 100 },   // sağ alt
    { x: -100, y: -100 }, // sol üst
    { x: -100, y: 100 }   // sol alt
  ]
  
  // Her karakter için rastgele bir yön seç
  charElements.value.forEach((el, index) => {
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    
    // Başlangıç pozisyonu ayarla
    gsap.set(el, {
      x: randomDirection.x,
      y: randomDirection.y,
      opacity: 0,
      rotationZ: Math.random() * 90 - 45 // Rastgele döndürme
    })
    
    // Animasyon timeline'a ekle
    tl.to(el, {
      duration: props.duration,
      x: 0,
      y: 0,
      opacity: 1,
      rotationZ: 0,
      ease: "elastic.out(1, 0.3)",
    }, index * props.stagger)
  })
})
</script>

<style scoped>
.animated-text-container {
  min-height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 2rem;
}
</style>