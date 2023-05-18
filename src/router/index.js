import Vue from 'vue'
import VueRouter from 'vue-router'
// 底部导航
import IndexView from '@/views/IndexView.vue'
import borrowBooksView from '@/views/borrowBooksView.vue'
import booksView from '@/views/booksView.vue'
import communityView from '@/views/communityView.vue'
import mineView from '@/views/mineView.vue'
// 轮播图下方导航
import stackView from '@/views/stackView.vue'
import bookListView from '@/views/bookListView.vue'
import readingView from '@/views/readingView.vue'
import narrateView from '@/views/narrateView.vue'
import vipView from '@/views/vipView.vue'
// 首页二级路由
import RecommendView from '@/views/RecommendView.vue'
import HandpickView from '@/views/HandpickView.vue'
import CommonView from '@/views/CommonView.vue'
import NewsletterView from '@/views/NewsletterView.vue'
// 借书子路由
import BorrowView from '@/views/BorrowView.vue'
import AlumnusView from '@/views/AlumnusView.vue'

import detailsView from '@/views/detailsView.vue'
import catalogueView from '@/views/catalogueView.vue'
import searchView from '@/views/searchView.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: IndexView,
    children: [{
        path: "",
        name: 'index',
        component: RecommendView
      },
      {
        path: "handpick",
        name: 'handpick',
        component: HandpickView
      },
      {
        path: "common",
        name: 'common',
        component: CommonView
      },
      {
        path: "newsletter",
        name: 'newsletter',
        component: NewsletterView
      }
    ]
  },
  {
    path: '/borrowBooks',
    component: borrowBooksView,
    children: [{
        path: "",
        name: 'borrow',
        component: BorrowView
      },
      {
        path: "/alumnus",
        name: 'alumnus',
        component: AlumnusView
      }
    ]
  },
  {
    path: '/books',
    name: 'books',
    component: booksView
  },
  {
    path: '/community',
    props: true,
    component: communityView,
    children: [{
        path: "",
        name: "community",
        component: () => import('../views/CircleView.vue')
      },
      {
        path: "/topic",
        component: () => import('../views/TopicView.vue')
      },
      {
        path: "/attention",
        component: () => import('../views/AttentionView.vue')
      },
      {
        path: "/abstracts",
        component: () => import('../views/AbstractsView.vue')
      },
    ]

  },
  {
    path: '/mine',
    name: 'mine',
    component: mineView
  },
  // 导航
  {
    path: '/stack',
    name: 'stack',
    component: stackView
  },
  {
    path: '/bookList',
    name: 'bookList',
    component: bookListView
  },
  {
    path: '/reading',
    name: 'reading',
    component: readingView
  },
  {
    path: '/narrate',
    name: 'narrate',
    component: narrateView
  },
  {
    path: '/vip',
    name: 'vip',
    component: vipView
  },
  {
    path: '/details',
    name: 'details',
    component: detailsView
  },

  {
    path: '/particular/:id/:title',
    name: 'particular',
    props: true,
    component: () => import('@/views/particularView.vue')
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    component: catalogueView
  },
  {
    path: '/search',
    name: 'search',
    component: searchView
  },

  {
    path: '/chapter',
    name: 'chapter',
    props: true,
    component: () => import('@/views/chapterContent.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router