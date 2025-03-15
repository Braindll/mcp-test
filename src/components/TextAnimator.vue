<template>
  <div class="text-animator" :style="containerStyle">
    <div 
      v-for="(char, index) in characters" 
      :key="index" 
      :ref="el => { if (el) charElements[index] = el }"
      class="inline-block opacity-0"
      :class="{ 'whitespace': char === ' ' }"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  // Metin içeriği
  text: {
    type: String,
    required: true,
    default: 'Merhaba Dünya'
  },
  
  // Animasyon stili
  animationType: {
    type: String,
    default: 'random',
    validator: (value) => [
      'random',       // Rastgele yönlerden
      'fromTop',      // Yukarıdan
      'fromBottom',   // Aşağıdan
      'fromLeft',     // Soldan
      'fromRight',    // Sağdan
      'fromCenter',   // Merkezden
      'toCenter',     // Merkeze doğru
      'wave',         // Dalga şeklinde
      'typewriter',   // Daktilo efekti
      'bounce',       // Zıplama efekti
      'flip',         // Döndürme efekti
      'fade'          // Sadece görünür olma
    ].includes(value)
  },
  
  // Animasyon süresi
  duration: {
    type: Number,
    default: 1.5
  },
  
  // Karakterler arası gecikme
  stagger: {
    type: Number,
    default: 0.05
  },
  
  // Animasyon başlangıç gecikmesi
  delay: {
    type: Number,
    default: 0
  },
  
  // Animasyon tekrarı
  repeat: {
    type: Number,
    default: 0 // 0: tekrar yok, -1: sonsuz tekrar
  },
  
  // Tekrarlar arası bekleme süresi
  repeatDelay: {
    type: Number,
    default: 1
  },
  
  // Yazı tipi boyutu
  fontSize: {
    type: String,
    default: '2rem'
  },
  
  // Yazı tipi kalınlığı
  fontWeight: {
    type: String,
    default: 'bold'
  },
  
  // Yazı rengi
  color: {
    type: String,
    default: 'currentColor'
  },
  
  // Otomatik başlat
  autoPlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['animation-complete', 'animation-start'])

const charElements = ref([])
const timeline = ref(null)
const isPlaying = ref(false)

const characters = computed(() => {
  return props.text.split('')
})

const containerStyle = computed(() => {
  return {
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    color: props.color,
    display: 'inline-block'
  }
})

// Animasyon yönlerini belirle
const getDirections = (type) => {
  switch (type) {
    case 'fromTop':
      return characters.value.map(() => ({ x: 0, y: -100, rotation: 0 }))
    
    case 'fromBottom':
      return characters.value.map(() => ({ x: 0, y: 100, rotation: 0 }))
    
    case 'fromLeft':
      return characters.value.map(() => ({ x: -100, y: 0, rotation: 0 }))
    
    case 'fromRight':
      return characters.value.map(() => ({ x: 100, y: 0, rotation: 0 }))
    
    case 'fromCenter':
      return characters.value.map(() => ({ x: 0, y: 0, scale: 0, rotation: 0 }))
    
    case 'toCenter':
      const directions = [
        { x: -100, y: -100 },  // sol üst
        { x: 0, y: -100 },     // üst
        { x: 100, y: -100 },   // sağ üst
        { x: -100, y: 0 },     // sol
        { x: 100, y: 0 },      // sağ
        { x: -100, y: 100 },   // sol alt
        { x: 0, y: 100 },      // alt
        { x: 100, y: 100 }     // sağ alt
      ]
      
      return characters.value.map((_, index) => {
        const dirIndex = index % directions.length
        return { 
          x: directions[dirIndex].x, 
          y: directions[dirIndex].y,
          rotation: Math.random() * 90 - 45
        }
      })
    
    case 'wave':
      return characters.value.map((_, index) => ({
        x: 0,
        y: 0,
        rotation: 0,
        waveIndex: index
      }))
    
    case 'typewriter':
      return characters.value.map(() => ({ x: 20, y: 0, opacity: 0, rotation: 0 }))
    
    case 'bounce':
      return characters.value.map(() => ({ x: 0, y: 100, rotation: 0 }))
    
    case 'flip':
      return characters.value.map(() => ({ x: 0, y: 0, rotationX: -90, rotation: 0 }))
    
    case 'fade':
      return characters.value.map(() => ({ x: 0, y: 0, opacity: 0, rotation: 0 }))
    
    case 'random':
    default:
      const randomDirections = [
        { x: -100, y: -100 },  // sol üst
        { x: 0, y: -100 },     // üst
        { x: 100, y: -100 },   // sağ üst
        { x: -100, y: 0 },     // sol
        { x: 100, y: 0 },      // sağ
        { x: -100, y: 100 },   // sol alt
        { x: 0, y: 100 },      // alt
        { x: 100, y: 100 }     // sağ alt
      ]
      
      return characters.value.map(() => {
        const randomIndex = Math.floor(Math.random() * randomDirections.length)
        return { 
          x: randomDirections[randomIndex].x, 
          y: randomDirections[randomIndex].y,
          rotation: Math.random() * 90 - 45
        }
      })
  }
}

// Animasyon ease tipini belirle
const getEase = (type) => {
  switch (type) {
    case 'bounce':
      return 'bounce.out'
    case 'wave':
      return 'power1.inOut'
    case 'typewriter':
      return 'power1.out'
    case 'flip':
      return 'back.out(1.7)'
    default:
      return 'elastic.out(1, 0.3)'
  }
}

// Animasyonu oluştur
const createAnimation = () => {
  if (timeline.value) {
    timeline.value.kill()
  }
  
  timeline.value = gsap.timeline({
    paused: !props.autoPlay,
    delay: props.delay,
    repeat: props.repeat,
    repeatDelay: props.repeatDelay,
    onStart: () => {
      isPlaying.value = true
      emit('animation-start')
    },
    onComplete: () => {
      isPlaying.value = false
      emit('animation-complete')
    }
  })
  
  // Animasyon tipine göre başlangıç değerlerini ayarla
  const directions = getDirections(props.animationType)
  const ease = getEase(props.animationType)
  
  // Her karakter için animasyon ayarla
  charElements.value.forEach((el, index) => {
    if (!el || characters.value[index] === ' ') return
    
    const direction = directions[index]
    
    // Başlangıç durumunu ayarla
    if (props.animationType === 'fromCenter') {
      gsap.set(el, {
        opacity: 0,
        scale: 0,
        rotation: direction.rotation || 0
      })
    } else if (props.animationType === 'wave') {
      gsap.set(el, {
        opacity: 0,
        y: 20
      })
    } else if (props.animationType === 'flip') {
      gsap.set(el, {
        opacity: 0,
        rotationX: direction.rotationX,
        transformOrigin: 'center center'
      })
    } else {
      gsap.set(el, {
        x: direction.x || 0,
        y: direction.y || 0,
        opacity: 0,
        rotation: direction.rotation || 0
      })
    }
    
    // Animasyon tipine göre farklı animasyonlar ekle
    if (props.animationType === 'wave') {
      timeline.value.to(el, {
        duration: props.duration,
        opacity: 1,
        y: 0,
        ease: ease,
        stagger: props.stagger
      }, index * props.stagger)
      
      // Dalga efekti için ek animasyon
      timeline.value.to(el, {
        duration: props.duration * 0.7,
        y: -10,
        ease: 'sine.inOut',
        repeat: 1,
        yoyo: true
      }, index * props.stagger + props.duration * 0.3)
    } 
    else if (props.animationType === 'typewriter') {
      timeline.value.to(el, {
        duration: props.duration * 0.3,
        x: 0,
        opacity: 1,
        ease: ease
      }, index * props.stagger)
    }
    else if (props.animationType === 'bounce') {
      timeline.value.to(el, {
        duration: props.duration,
        y: 0,
        opacity: 1,
        ease: ease
      }, index * props.stagger)
    }
    else if (props.animationType === 'flip') {
      timeline.value.to(el, {
        duration: props.duration,
        opacity: 1,
        rotationX: 0,
        ease: ease
      }, index * props.stagger)
    }
    else if (props.animationType === 'fromCenter') {
      timeline.value.to(el, {
        duration: props.duration,
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: ease
      }, index * props.stagger)
    }
    else {
      timeline.value.to(el, {
        duration: props.duration,
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        ease: ease
      }, index * props.stagger)
    }
  })
  
  return timeline.value
}

// Animasyonu başlat
const play = () => {
  if (timeline.value) {
    timeline.value.play(0)
  } else {
    createAnimation().play(0)
  }
}

// Animasyonu durdur
const pause = () => {
  if (timeline.value) {
    timeline.value.pause()
  }
}

// Animasyonu sıfırla
const reset = () => {
  if (timeline.value) {
    timeline.value.pause(0)
  }
}

// Dışa aktarılan metodlar
defineExpose({
  play,
  pause,
  reset,
  isPlaying
})

// Props değiştiğinde animasyonu güncelle
watch(() => [props.text, props.animationType], () => {
  // Animasyonu yeniden oluştur
  createAnimation()
  
  // Otomatik başlatma aktifse animasyonu başlat
  if (props.autoPlay) {
    play()
  }
}, { deep: true })

onMounted(() => {
  // Animasyonu oluştur
  createAnimation()
  
  // Otomatik başlatma aktifse animasyonu başlat
  if (props.autoPlay) {
    play()
  }
})
</script>

<style scoped>
.text-animator {
  position: relative;
  overflow: visible;
}

.whitespace {
  margin-right: 0.25em;
}
</style>