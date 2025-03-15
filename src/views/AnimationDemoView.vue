<template>
  <main class="min-h-screen pt-16 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
    <section class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-12 text-center">Animasyon Demosu</h1>
      
      <div class="max-w-3xl mx-auto mb-16">
        <div class="text-animation-container relative h-40 md:h-60 flex items-center justify-center overflow-hidden">
          <div 
            v-for="(char, index) in 'GSAP DEMO'" 
            :key="index" 
            :ref="el => { if (el) charRefs[index] = el }"
            class="text-5xl md:text-7xl font-bold absolute opacity-0"
          >
            {{ char }}
          </div>
        </div>
        
        <div class="flex justify-center mt-8">
          <button 
            @click="playAnimation" 
            class="btn-primary"
          >
            Animasyonu Tekrarla
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4">Özellikler</h2>
          <ul class="space-y-2">
            <li 
              v-for="(feature, index) in features" 
              :key="index"
              :ref="el => { if (el) featureRefs[index] = el }"
              class="flex items-center opacity-0"
            >
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {{ feature }}
            </li>
          </ul>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold mb-4">Animasyon Türleri</h2>
          <div class="grid grid-cols-2 gap-4">
            <div 
              v-for="(type, index) in animationTypes" 
              :key="index"
              :ref="el => { if (el) typeRefs[index] = el }"
              class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center opacity-0"
            >
              {{ type }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const charRefs = ref([])
const featureRefs = ref([])
const typeRefs = ref([])

const features = [
  'Karakter bazlı animasyonlar',
  'Farklı yönlerden gelen hareketler',
  'Elastik geçişler',
  'Zamanlama kontrolü',
  'Özelleştirilebilir efektler'
]

const animationTypes = [
  'Fade In/Out',
  'Slide',
  'Rotate',
  'Scale',
  'Bounce',
  'Elastic',
  'Flip',
  'Shake'
]

// Ana metin animasyonu
const animateText = () => {
  const tl = gsap.timeline()
  
  // Önce tüm karakterleri sıfırla
  gsap.set(charRefs.value, { 
    opacity: 0,
    scale: 0,
    rotation: 0,
    x: 0,
    y: 0
  })
  
  // Farklı yönlerden gelecek şekilde ayarla
  const directions = [
    { x: -200, y: -200 },  // sol üst
    { x: 0, y: -200 },     // üst
    { x: 200, y: -200 },   // sağ üst
    { x: -200, y: 0 },     // sol
    { x: 200, y: 0 },      // sağ
    { x: -200, y: 200 },   // sol alt
    { x: 0, y: 200 },      // alt
    { x: 200, y: 200 },    // sağ alt
  ]
  
  // Her karakter için rastgele bir yön seç
  charRefs.value.forEach((el, index) => {
    const direction = directions[index % directions.length]
    
    gsap.set(el, {
      x: direction.x,
      y: direction.y,
      rotation: Math.random() * 360 - 180,
      scale: 0,
      opacity: 0
    })
    
    // Animasyon timeline'a ekle
    tl.to(el, {
      duration: 1.5,
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      ease: "elastic.out(1, 0.3)",
    }, index * 0.1)
  })
  
  return tl
}

// Özellikler listesi animasyonu
const animateFeatures = () => {
  const tl = gsap.timeline()
  
  gsap.set(featureRefs.value, { 
    opacity: 0,
    x: -50
  })
  
  featureRefs.value.forEach((el, index) => {
    tl.to(el, {
      duration: 0.5,
      opacity: 1,
      x: 0,
      ease: "power2.out"
    }, 1.5 + (index * 0.1))
  })
  
  return tl
}

// Animasyon türleri animasyonu
const animateTypes = () => {
  const tl = gsap.timeline()
  
  gsap.set(typeRefs.value, { 
    opacity: 0,
    y: 50,
    scale: 0.8
  })
  
  typeRefs.value.forEach((el, index) => {
    tl.to(el, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.7)"
    }, 1.8 + (index * 0.1))
  })
  
  return tl
}

// Ana animasyon timeline
const masterTimeline = ref(null)

const playAnimation = () => {
  if (masterTimeline.value) {
    masterTimeline.value.restart()
  } else {
    createMasterTimeline()
  }
}

const createMasterTimeline = () => {
  masterTimeline.value = gsap.timeline()
  
  // Tüm animasyonları ana timeline'a ekle
  masterTimeline.value
    .add(animateText())
    .add(animateFeatures(), "-=1")
    .add(animateTypes(), "-=1")
}

onMounted(() => {
  // Sayfa yüklendiğinde animasyonu başlat
  setTimeout(() => {
    createMasterTimeline()
  }, 500)
})
</script>

<style scoped>
.text-animation-container {
  perspective: 1000px;
}
</style>