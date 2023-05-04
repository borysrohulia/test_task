import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/Layout.vue'),
      children: [{
        path: '',
        name: 'MainPage',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MainPage.vue')
      },
      {
        path: '/error',
        name: 'ErrorPage',
        component: () => import('../views/ErrorPage.vue')
      }]
    },
  ]
})

export default router
