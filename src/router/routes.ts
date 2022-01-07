import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Home.vue') }],
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Admin.vue') }],
  },
  {
    path: '/worship-live',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WorshipLive.vue') }],
  },
  {
    path: '/one-verse',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/OneVerse.vue') }],
  },
  {
    path: '/qt',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/QT.vue') }],
    beforeEnter() {
      window.open('https://sum.su.or.kr:8888/bible/today');
    },
  },
  {
    path: '/joy-chant',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/JoyChant.vue') }],
  },
  {
    path: '/read-thru',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ReadThru.vue') }],
  },
  {
    path: '/message/:playlistName',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/message/:playlistName',
        component: () => import('pages/Message.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/watch/:streamDocId',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/watch/:streamDocId',
        component: () => import('pages/Watch.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/worship',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Worship.vue') }],
  },
  {
    path: '/community',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Community.vue') }],
  },
  {
    path: '/contact',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Contact.vue') }],
  },
  {
    path: '/gallery',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Gallery.vue') }],
  },
  {
    path: '/church-intro',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ChurchIntro.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
