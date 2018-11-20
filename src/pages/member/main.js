import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import Options from '@/utils/storeOptions'
import router from './router'
import storeMixin from '@/mixin/storeMixin'
import sunTopbar from '@/components/topbar.vue'
import sunSider from '@/components/sider.vue'
import sunFooter from '@/components/footer.vue'
import Message from '@/components/message/index.js'
import '@/assets/global.scss'
import './style.scss'
Vue.use(Message)
Vue.use(Vuex)
const options = new Options()
const store = new Vuex.Store(options)
new Vue({
    el: '#app',
    router,
    store,
    mixins: [storeMixin],
    components: { sunTopbar, sunSider, sunFooter },
    data: {
        username: '',
        password: ''
    },
    methods: {
        onLogo() { window.open('/home.html', '_self') }
    }
})