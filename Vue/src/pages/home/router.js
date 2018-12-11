import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        component: () => import('./views/index.vue')
    }, {
        path: '/category',
        component: () => import('./views/category.vue')
    }]
})

export default router