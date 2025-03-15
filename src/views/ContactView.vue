<template>
  <main class="min-h-screen pt-16">
    <section class="container mx-auto px-4 py-12">
      <div class="max-w-lg mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-center">İletişim</h1>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="name" class="block mb-2">Ad Soyad</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            >
          </div>
          <div>
            <label for="email" class="block mb-2">E-posta</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            >
          </div>
          <div>
            <label for="message" class="block mb-2">Mesaj</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              class="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full btn-primary"
            :disabled="loading"
          >
            {{ loading ? 'Gönderiliyor...' : 'Gönder' }}
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  message: ''
})

async function handleSubmit() {
  loading.value = true
  try {
    await addDoc(collection(db, 'messages'), {
      ...form.value,
      createdAt: new Date()
    })
    form.value = {
      name: '',
      email: '',
      message: ''
    }
    alert('Mesajınız başarıyla gönderildi!')
  } catch (error) {
    console.error('Mesaj gönderilirken hata oluştu:', error)
    alert('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
  } finally {
    loading.value = false
  }
}
</script>