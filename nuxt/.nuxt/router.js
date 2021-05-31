import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5d6dd505 = () => interopDefault(import('..\\pages\\layout\\index.vue' /* webpackChunkName: "" */))
const _70824570 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "" */))
const _e0810088 = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "" */))
const _708e72bc = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "" */))
const _8b97bda8 = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "" */))
const _1ab1923c = () => interopDefault(import('..\\pages\\editor\\index.vue' /* webpackChunkName: "" */))
const _163b0d4f = () => interopDefault(import('..\\pages\\article\\index.vue' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _5d6dd505,
    name: "layout",
    children: [{
      path: "",
      component: _70824570,
      name: "home"
    }, {
      path: "/login",
      component: _e0810088,
      name: "login"
    }, {
      path: "/register",
      component: _e0810088,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _708e72bc,
      name: "profile"
    }, {
      path: "/settings",
      component: _8b97bda8,
      name: "settings"
    }, {
      path: "/editor",
      component: _1ab1923c,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _163b0d4f,
      name: "article"
    }]
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
