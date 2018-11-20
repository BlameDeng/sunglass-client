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
    data: { currentTab: 'index' },
    watch: {
        currentTab(val) {
            const tabs = ['index', 'all', 'female', 'male', 'discount']
            const titles = ['Sunglass - 首页', 'Sunglass - 全部', 'Sunglass - 女士', 'Sunglass - 男士', 'Sunglass - 特惠']
            let index = tabs.indexOf(val)
            if (index > -1) {
                document.title = titles[index]
                this.hanleSlider(index + 1)
            }
        }
    },
    created() {
        this.getNewArrival()
    },
    async mounted() {
        await this.$nextTick()
        const pattern = /^.*\?tab=(\w+)$/
        if (pattern.test(window.location.href)) { this.currentTab = RegExp.$1 }
        this.check().catch(()=>{})
    },
    methods: {
        onTab(tab) {
            tab === 'index' ? this.$router.push('/') : this.$router.push({ path: '/category', query: { tab } })
            this.currentTab = tab
        },
        hanleSlider(n) {
            this.$refs.slider.style.transform = `translateX(${(n-1)*60}px)`
            this.$refs.fill.style.transform = `translateX(${(n-1)*60}px)`
        }
    }
})