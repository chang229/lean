import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f6117904 = () => interopDefault(import('..\\pages\\layout\\index.vue' /* webpackChunkName: "" */))
const _8b5203ae = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "" */))
const _fefc43ba = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "" */))
const _3a32d363 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "" */))
const _251bd565 = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "" */))
const _1a30a55b = () => interopDefault(import('..\\pages\\editor\\index.vue' /* webpackChunkName: "" */))
const _40412414 = () => interopDefault(import('..\\pages\\article\\index.vue' /* webpackChunkName: "" */))

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
    component: _f6117904,
    name: "layout",
    children: [{
      path: "",
      component: _8b5203ae,
      name: "layoutIndex"
    }, {
      path: "/login",
      component: _fefc43ba,
      name: "login"
    }, {
      path: "/register",
      component: _fefc43ba,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _3a32d363,
      name: "profile"
    }, {
      path: "/settings",
      component: _251bd565,
      name: "settings"
    }, {
      path: "/editor",
      component: _1a30a55b,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _40412414,
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
