import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: '/',
        component: () => import('./views/user.vue')
    }, {
        path: '/login',
        component: () => import('./views/login.vue')
    }]
})

export default router