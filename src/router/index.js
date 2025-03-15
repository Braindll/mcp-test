import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/animation-demo',
      name: 'animation-demo',
      component: () => import('../views/AnimationDemoView.vue')
    },
    {
      path: '/text-animator',
      name: 'text-animator',
      component: () => import('../views/TextAnimatorDemo.vue')
    }
  ]
})

export default router