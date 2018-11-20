import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import Options from '@/utils/storeOptions'
import router from './router'
import storeMixin from '@/mixin/storeMixin'
import xIcon from '@/components/icon/icon.vue'
import sunTopbar from '@/components/topbar.vue'
import sunSider from '@/components/sider.vue'
import sunFooter from '@/components/footer.vue'
import Message from '@/components/message/index'
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
    components: { xIcon, sunTopbar, sunSider, sunFooter },
    data() {
        return {
            currentTab: ''
        }
    },
    watch: {
        $route(val) {
            let tab = val.path.substr(1)
            if (tab === 'cart' || tab === 'order') {
                this.currentTab = tab
            }
            if (tab === 'order') {
                document.title = '已买到的宝贝'
            } else {
                document.title = '我的购物车'
            }
        },
        isLogin(val){
            if (!val) {
                window.open('/member.html','_self')
            }
        }
    },
    methods: {
        onLogo() { window.open('/home.html', '_self') },
        onLink(tab) {
            this.$router.push(`/${tab}`)
        }
    }
})