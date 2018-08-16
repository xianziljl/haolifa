import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function createRoutesFromFiles (routeFiles) {
  let _routes = []
  routeFiles.keys().forEach(key => {
    let item = routeFiles(key).default
    if (item instanceof Array) item.forEach(route => _routes.push(route))
    else _routes.push(item)
  })
  return _routes
}

function eachRoutes (children, parent) {
  children.forEach(child => {
    if (!child.meta) child.meta = {}
    if (parent) for (let key in parent.meta) child.meta[key] = child.meta[key] || parent.meta[key]
    if (child.children) eachRoutes(child.children, child)
  })
}

const routes = createRoutesFromFiles(require.context('../', true, /(\.\/pages\/([a-zA-Z0-9_-]+\/)+?router)\.js$/))

eachRoutes(routes)

const createRouter = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../pages/Login/index.vue'),
    meta: { level: 1, title: '登录', open: true }
  }, {
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '../pages/Main/index.vue'),
    meta: { level: 2, title: 'HAOLIFA', open: true },
    children: routes
  }]
})

const router = createRouter()

router.addRoutes(routes.filter(r => r.meta.open))

router.beforeEach((to, from, next) => {
  if (to.meta.open) {
    return next()
  }
})

router.onError(err => { console.log(err) })

export function resetRouter () {
  router.matcher = createRouter().matcher
  router.addRoutes(routes.filter(r => r.meta.open))
}

export default router
