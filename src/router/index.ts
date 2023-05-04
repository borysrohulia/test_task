import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch*',
      redirect: { name: 'CheapTicket' }
    },
    {
      path: '/',
      component: () => import('../layouts/Layout.vue'),
      children: [{
        path: '',
        name: 'MainPage',
        component: () => import('../views/MainPage.vue'),
        children: [
          {
            path: '/',
            component: () => import('../views/TabLayout.vue'),
            children: [
              {
                path: '',
                redirect: { name: 'CheapTicket' }
              },
              {
                path: '/cheap-tickets',
                name: 'CheapTicket',
                component: () => import('../views/CheapTickets.vue')
              },
              {
                path: '/faster-tickets',
                name: 'FasterTickets',
                component: () => import('../views/FasterTickets.vue')
              },
              {
                path: '/optimize-tickets',
                name: 'OptimizeTickets',
                component: () => import('../views/OptimizeTickets.vue')
              }
            ]
          }
        ]
      },
      {
        path: '/error',
        name: 'ErrorPage',
        component: () => import('../views/ErrorPage.vue')
      }],
      redirect: { name: 'CheapTicket' }
    },
  ]
})

export default router
