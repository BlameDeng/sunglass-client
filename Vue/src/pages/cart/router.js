import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/cart'
        },
        {
            path: '/cart',
            component: () => import('./views/cart.vue')
        }, {
            path: '/payment',
            component: () => import('./views/payment.vue')
        },
        {
            path: '/order',
            component: () => import('./views/order.vue')
        }
    ]
})

export default router