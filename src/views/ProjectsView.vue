<template>
  <main class="min-h-screen pt-16">
    <section class="container mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-12 text-center">Projeler</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Proje kartları buraya gelecek -->
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

const projects = ref([])

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'))
    projects.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Projeler yüklenirken hata oluştu:', error)
  }
})
</script>