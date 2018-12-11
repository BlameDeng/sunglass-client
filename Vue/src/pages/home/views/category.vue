<template>
    <div class="category">
        <x-waterfall v-if="productsList&&productsList.length" :width="220" :source="productsList" @scroll-bottom="scrollBottom">
            <div slot-scope="slotProps">
                <sun-sku :product="slotProps.prop" @add-to-cart="handleAddToCart($event)"></sun-sku>
            </div>
        </x-waterfall>
    </div>
</template>
<script>
    import storeMixin from '@/mixin/storeMixin'
    import xWaterfall from '@/components/waterfall.vue'
    import sunSku from '@/components/sku.vue'
    export default {
        name: 'Category',
        mixins: [storeMixin],
        components: { xWaterfall, sunSku },
        data() {
            return { tab: '', fakeAllProducts: null, timerId: null }
        },
        computed: {
            productsList() {
                if (!this.fakeAllProducts) { return null }
                if (this.tab === 'male') {
                    return this.fakeAllProducts.filter(product => product.category === 'male')
                }
                if (this.tab === 'female') {
                    return this.fakeAllProducts.filter(product => product.category === 'female')
                }
                if (this.tab === 'discount') {
                    return this.fakeAllProducts.filter(product => product.discount < product.price)
                }
                return this.fakeAllProducts
            }
        },
        watch: {
            $route: {
                handler(val) {
                    this.tab = val.query.tab
                },
                deep: true,
                immediate: true
            }
        },
        async created() {
            !this.allProducts && await this.getAllProducts()
            this.fakeAllProducts = this.allProducts
        },
        beforeDestroy() {
            if (this.timerId) {
                window.clearTimeout(this.timerId)
                this.timerId = null
            }
        },
        methods: {
            scrollBottom() {
                if (this.timerId || this.fakeAllProducts.length > 80) { return }
                if (this.fakeAllProducts && this.allProducts) {
                    this.timerId = setTimeout(() => {
                        this.fakeAllProducts = this.fakeAllProducts.concat(this.allProducts)
                        if (this.timerId) {
                            window.clearTimeout(this.timerId)
                            this.timerId = null
                        }
                    }, 1500)
                }
            },
            handleAddToCart(product) {
                if (!this.isLogin) {
                    window.open('/member.html','_blank')
                    return
                }
                this.addToCart({ count: 1, id: product.id })
            }
        }
    }
</script>
<style scoped lang="scss">
    .category {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }
</style>