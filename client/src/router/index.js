import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/auth',
    component: () => import('@/pages/auth/login.vue'),
    meta: {
      title: '登录',
      hideOnMenu: true
    }
  },
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: '系统首页'
    },
    component: () => import('@/components/Layout/Layout.vue'), // 懒加载组件
    children: [
      {
        path: '/dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: {
          title: '总览',
          icon: 'ep:stopwatch'
        }
      },
      {
        path: '/pro',
        component: () => import('@/pages/pro/index.vue'),
        meta: {
          title: '项目',
          icon: 'ep:cold-drink'
        },
        children: [
          {
            path: 'a',
            component: () => import('@/pages/a/index.vue'),
            meta: {
              title: 'A',
              icon: 'ep:bicycle'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/pages/404.vue'),
    meta: {
      hideOnMenu: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
