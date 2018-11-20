import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import Options from '@/utils/storeOptions'
import storeMixin from '@/mixin/storeMixin'
import xIcon from '@/components/icon/icon.vue'
import sunTopbar from '@/components/topbar.vue'
import sunSider from '@/components/sider.vue'
import sunFooter from '@/components/footer.vue'
import Message from '@/components/message/index.js'
import '@/assets/global.scss'
import './style.scss'
Vue.use(Message)
Vue.use(Message)
Vue.use(Vuex)
const options = new Options()
const store = new Vuex.Store(options)
new Vue({
    el: '#app',
    store,
    mixins: [storeMixin],
    components: { xIcon, sunTopbar, sunSider, sunFooter },
    data() {
        return {
            currentImg: 'main',
            currentTab: 'detail',
            count: 1,
            content: '',
            evaluation: null,
            order: null
        }
    },
    watch: {
        content(val) {
            if (val.length > 300) {
                this.content = val.substr(0, 300)
            }
        }
    },
    async mounted() {
        await this.check().catch(() => {})
        let href = window.location.href
        const pattern1 = /^.*\?id=(\w+)$/
        const pattern2 = /^.*\?oid=(\w+)&pid=(\w+)$/
        if (pattern1.test(href)) {
            let pid = RegExp.$1
            await this.getSingleProduct({ id: pid })
            this.handleGetEvaluation(pid)
            await this.$nextTick()
            let { width } = this.$refs.showImg.getBoundingClientRect()
            this.$refs.showImg.style.height = width + 'px'
        } else if (pattern2.test(href)) {
            let oid = RegExp.$1
            let pid = RegExp.$2
            await this.getOrder({ id: oid }).then(res => {
                this.order = res.data
            })
            await this.getSingleProduct({ id: pid })
            this.handleGetEvaluation(pid)
            this.currentTab = 'evaluation'
            await this.$nextTick()
            let { width } = this.$refs.showImg.getBoundingClientRect()
            this.$refs.showImg.style.height = width + 'px'
        }
    },
    methods: {
        handleGetEvaluation(id) {
            this.getEvaluation({ id })
                .then(res => {
                    this.evaluation = res.data
                })

        },
        onLogo() { window.open('/home.html', '_self') },
        countBlur() {
            if (!this.count || typeof this.count !== 'number' || this.count < 0) {
                this.count = 1
            }
        },
        onChangeCount(n) {
            if (this.count + n < 1) {
                return
            } else {
                this.count += n
            }
        },
        async onAddToCart() {
            if (!this.isLogin) {
                window.open('/member.html', '_blank')
                return
            }
            let id = this.singleProduct.id
            let count = 0
            this.cart.products.forEach(item => {
                if (item.id === id) {
                    count = item.count
                }
            })
            //新添加
            if (count === 0) {
                this.addToCart({ id, count: this.count })
                //改变数量
            } else if (this.count > count && count !== 0) {
                this.addToCart({ id, count: this.count, type: 'changeCount' })
            }
        },
        async onBuy() {
            if (!this.isLogin) {
                window.open('/member.html', '_blank')
                return
            }
            await this.onAddToCart()
            window.open('/cart.html', '_blank')
        },
        async onSubmit() {
            if (!this.content) {
                this.$info({ message: '评价内容不能为空' })
                return
            }
            if (this.order.status !== 'toEvaluate') { return }
            await this.createEvaluation({
                    pid: this.singleProduct.id,
                    oid: this.order.id,
                    username: this.user.username,
                    nickyname: this.user.nickyname || '',
                    content: this.content
                })
                .then(res => {
                    this.evaluation = res.data
                })
            this.getOrder({ id: this.order.id }).then(res => {
                this.order = res.data
            })
        },
        formatDate(params) {
            let time
            if (typeof params === 'string') {
                time = new Date(params)
            } else {
                time = params
            }
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            if (month < 10) {
                month = '0' + month
            }
            let date = time.getDate()
            if (date < 10) {
                date = '0' + date
            }
            return '' + year + '-' + month + '-' + date
        }
    }
})