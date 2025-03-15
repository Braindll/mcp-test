<template>
  <main class="min-h-screen pt-16 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
    <section class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-12 text-center">Metin Animasyon Demosu</h1>
      
      <div class="max-w-3xl mx-auto mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div class="flex justify-center mb-8">
          <TextAnimator
            ref="textAnimator"
            :text="animationText"
            :animation-type="animationType"
            :duration="duration"
            :stagger="stagger"
            :delay="delay"
            :repeat="repeat"
            :repeat-delay="repeatDelay"
            :font-size="fontSize"
            :font-weight="fontWeight"
            :color="textColor"
            :auto-play="autoPlay"
            @animation-complete="onAnimationComplete"
            @animation-start="onAnimationStart"
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Sol Taraf - Kontroller -->
          <div class="space-y-4">
            <div>
              <label for="text" class="block mb-2 font-medium">Metin</label>
              <input
                id="text"
                v-model="animationText"
                type="text"
                class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              >
            </div>
            
            <div>
              <label for="animation-type" class="block mb-2 font-medium">Animasyon Tipi</label>
              <select
                id="animation-type"
                v-model="animationType"
                class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="random">Rastgele</option>
                <option value="fromTop">Yukarıdan</option>
                <option value="fromBottom">Aşağıdan</option>
                <option value="fromLeft">Soldan</option>
                <option value="fromRight">Sağdan</option>
                <option value="fromCenter">Merkezden</option>
                <option value="toCenter">Merkeze Doğru</option>
                <option value="wave">Dalga</option>
                <option value="typewriter">Daktilo</option>
                <option value="bounce">Zıplama</option>
                <option value="flip">Döndürme</option>
                <option value="fade">Solma</option>
              </select>
            </div>
            
            <div>
              <label for="duration" class="block mb-2 font-medium">Süre: {{ duration }}s</label>
              <input
                id="duration"
                v-model="duration"
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                class="w-full"
              >
            </div>
            
            <div>
              <label for="stagger" class="block mb-2 font-medium">Gecikme: {{ stagger }}s</label>
              <input
                id="stagger"
                v-model="stagger"
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                class="w-full"
              >
            </div>
            
            <div>
              <label for="repeat" class="block mb-2 font-medium">Tekrar: {{ repeat === -1 ? 'Sonsuz' : repeat }}</label>
              <input
                id="repeat"
                v-model="repeat"
                type="range"
                min="-1"
                max="10"
                step="1"
                class="w-full"
              >
            </div>
          </div>
          
          <!-- Sağ Taraf - Daha Fazla Kontrol -->
          <div class="space-y-4">
            <div>
              <label for="font-size" class="block mb-2 font-medium">Yazı Boyutu</label>
              <select
                id="font-size"
                v-model="fontSize"
                class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="1rem">Küçük</option>
                <option value="2rem">Orta</option>
                <option value="3rem">Büyük</option>
                <option value="4rem">Çok Büyük</option>
              </select>
            </div>
            
            <div>
              <label for="font-weight" class="block mb-2 font-medium">Yazı Kalınlığı</label>
              <select
                id="font-weight"
                v-model="fontWeight"
                class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="normal">Normal</option>
                <option value="bold">Kalın</option>
                <option value="900">Çok Kalın</option>
              </select>
            </div>
            
            <div>
              <label for="text-color" class="block mb-2 font-medium">Renk</label>
              <select
                id="text-color"
                v-model="textColor"
                class="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="currentColor">Varsayılan</option>
                <option value="#3B82F6">Mavi</option>
                <option value="#EF4444">Kırmızı</option>
                <option value="#10B981">Yeşil</option>
                <option value="#F59E0B">Turuncu</option>
                <option value="#8B5CF6">Mor</option>
              </select>
            </div>
            
            <div class="flex items-center mt-4">
              <input
                id="auto-play"
                v-model="autoPlay"
                type="checkbox"
                class="mr-2"
              >
              <label for="auto-play">Otomatik Başlat</label>
            </div>
            
            <div class="flex gap-4 mt-6">
              <button
                @click="playAnimation"
                class="btn-primary flex-1"
              >
                Oynat
              </button>
              <button
                @click="resetAnimation"
                class="btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex-1"
              >
                Sıfırla
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4">Animasyon Örnekleri</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(example, index) in examples" 
            :key="index"
            class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col items-center"
          >
            <h3 class="text-lg font-medium mb-4">{{ example.name }}</h3>
            <TextAnimator
              :text="example.text"
              :animation-type="example.type"
              :duration="example.duration"
              :stagger="example.stagger"
              :repeat="example.repeat"
              :font-size="example.fontSize || '1.5rem'"
              :color="example.color || 'currentColor'"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import TextAnimator from '../components/TextAnimator.vue'

// Ana animasyon kontrolü
const textAnimator = ref(null)
const animationText = ref('Merhaba Dünya')
const animationType = ref('toCenter')
const duration = ref(1.5)
const stagger = ref(0.05)
const delay = ref(0)
const repeat = ref(0)
const repeatDelay = ref(1)
const fontSize = ref('3rem')
const fontWeight = ref('bold')
const textColor = ref('currentColor')
const autoPlay = ref(true)

// Animasyon kontrol fonksiyonları
const playAnimation = () => {
  textAnimator.value.play()
}

const resetAnimation = () => {
  textAnimator.value.reset()
}

const onAnimationComplete = () => {
  console.log('Animasyon tamamlandı')
}

const onAnimationStart = () => {
  console.log('Animasyon başladı')
}

// Örnek animasyonlar
const examples = [
  {
    name: 'Daktilo Efekti',
    text: 'Daktilo',
    type: 'typewriter',
    duration: 0.8,
    stagger: 0.08,
    repeat: -1,
    repeatDelay: 2
  },
  {
    name: 'Dalga Efekti',
    text: 'Dalgalı Yazı',
    type: 'wave',
    duration: 1,
    stagger: 0.05,
    repeat: -1,
    repeatDelay: 1.5,
    color: '#3B82F6'
  },
  {
    name: 'Zıplama Efekti',
    text: 'Zıplayan Yazı',
    type: 'bounce',
    duration: 1.2,
    stagger: 0.06,
    repeat: -1,
    repeatDelay: 2,
    color: '#EF4444'
  },
  {
    name: 'Döndürme Efekti',
    text: 'Dönen Yazı',
    type: 'flip',
    duration: 1.5,
    stagger: 0.07,
    repeat: -1,
    repeatDelay: 2,
    color: '#10B981'
  }
]
</script>