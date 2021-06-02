import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _163b0d4f = () => interopDefault(import('..\\pages\\article\\index.vue' /* webpackChunkName: "pages/article/index" */))
const _1ab1923c = () => interopDefault(import('..\\pages\\editor\\index.vue' /* webpackChunkName: "pages/editor/index" */))
const _70824570 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages/home/index" */))
const _5d6dd505 = () => interopDefault(import('..\\pages\\layout\\index.vue' /* webpackChunkName: "pages/layout/index" */))
const _e0810088 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages/login/index" */))
const _708e72bc = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _8b97bda8 = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages/settings/index" */))
const _5db7feef = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/article",
    component: _163b0d4f,
    name: "article"
  }, {
    path: "/editor",
    component: _1ab1923c,
    name: "editor"
  }, {
    path: "/home",
    component: _70824570,
    name: "home"
  }, {
    path: "/layout",
    component: _5d6dd505,
    name: "layout"
  }, {
    path: "/login",
    component: _e0810088,
    name: "login"
  }, {
    path: "/profile",
    component: _708e72bc,
    name: "profile"
  }, {
    path: "/settings",
    component: _8b97bda8,
    name: "settings"
  }, {
    path: "/",
    component: _5db7feef,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
