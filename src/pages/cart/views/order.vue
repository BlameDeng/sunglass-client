<template>
    <div class="sun-order">
        <div class="title">
            已买到的宝贝
        </div>
        <nav class="navbar">
            <a href="javascript:0;" :class="{active:currentTab==='all'}" @click="onTab('all')">
                全部订单
            </a>
            <a href="javascript:0;" :class="{active:currentTab==='toConfirm'}" @click="onTab('toConfirm')">
                待收货
                <span class="number">{{toConfirmOrders&&(toConfirmOrders.length||'')}}</span>
            </a>
            <a href="javascript:0;" :class="{active:currentTab==='toEvaluate'}" @click="onTab('toEvaluate')">
                待评价
                <span class="number">{{toEvaluateOrders&&(toEvaluateOrders.length||'')}}</span>
            </a>
            <a href="javascript:0;" :class="{active:currentTab==='done'}" @click="onTab('done')">
                已完成订单
            </a>
        </nav>
        <ul class="title-bar">
            <li class="info">商品信息</li>
            <li class="price">单价</li>
            <li class="count">数量</li>
            <li class="pay">实付款</li>
            <li class="action">操作</li>
        </ul>
        <ul class="goods">
            <template v-if="instageOrder&&instageOrder.length">
                <li v-for="order in instageOrder" :key="order.id">
                    <header class="order-info">
                        <span class="number">{{formatDate(order.createdAt)}}</span>
                        <span>订单号：</span>
                        <span class="number">{{order.id}}</span>
                    </header>
                    <div class="info">
                        <img :src="order.product.main_image" @click="onProductDetail(order.product)">
                        <span @click="onProductDetail(order.product)">
                            {{order.product.title}}
                        </span>
                    </div>
                    <div class="price">
                        <span>￥{{order.product.discount.toFixed(2)}}</span>
                        <span class="origin" v-if="order.product.discount<order.product.price">
                            <span class="text">原价</span>
                            ￥{{order.product.price.toFixed(2)}}
                        </span>
                    </div>
                    <div class="count">
                        <span class="text">&times;</span>
                        {{order.product.count}}
                    </div>
                    <div class="total">￥{{(order.product.discount*order.product.count).toFixed(2)}}</div>
                    <div class="action">
                        <a class="btn delivery" href="javascript:0;" @click="onConfirm(order)" v-if="order.status==='toConfirm'">
                            确认收货
                        </a>
                        <a class="btn" href="javascript:0;" @click="onEvaluate(order)" v-if="order.status==='toEvaluate'">
                            评价商品
                        </a>
                        <a class="btn" href="javascript:0;" @click="onDelete(order)" v-if="order.status==='done'">
                            <x-icon name="delete" class="icon"></x-icon>删除订单
                        </a>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
    import xIcon from '@/components/icon/icon.vue'
    import storeMixin from '@/mixin/storeMixin'
    export default {
        name: 'Order',
        mixins: [storeMixin],
        components: { xIcon },
        data() {
            return { currentTab: 'toConfirm' }
        },
        computed: {
            toConfirmOrders() {
                if (!this.allOrders || !this.allOrders.length) {
                    return null
                }
                return this.allOrders.filter(order => order.status === 'toConfirm')
            },
            toEvaluateOrders() {
                if (!this.allOrders || !this.allOrders.length) {
                    return null
                }
                return this.allOrders.filter(order => order.status === 'toEvaluate')
            },
            doneOrders() {
                if (!this.allOrders || !this.allOrders.length) {
                    return null
                }
                return this.allOrders.filter(order => order.status === 'done')
            },
            instageOrder() {
                if (!this.allOrders || !this.allOrders.length) {
                    return null
                }
                if (this.currentTab === 'all') {
                    return this.allOrders
                }
                if (this.currentTab === 'toConfirm') {
                    return this.toConfirmOrders
                }
                if (this.currentTab === 'toEvaluate') {
                    return this.toEvaluateOrders
                }
                if (this.currentTab === 'done') {
                    return this.doneOrders
                }
            }
        },
        mounted() {
            this.getOrder()
        },
        methods: {
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
            },
            onTab(tab) {
                this.currentTab = tab
            },
            onProductDetail(product) {
                window.open(`/product.html?id=${product.id}`, '_blank')
            },
            onConfirm(order) {
                this.changeOrderStatus({ order, status: 'toEvaluate' })
                    .catch(error => {
                        this.$error({ message: error.msg })
                    })
            },
            onEvaluate(order) {
                window.open(`/product.html?oid=${order.id}&pid=${order.product.id}`, '_blank')
            },
            onDelete(order) {
                this.deleteOrder({ id: order.id })
            }
        }
    }
</script>
<style scoped lang="scss">
    .sun-order {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        >.title {
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            height: 70px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            padding-left: 20px;
            margin: 10px 0;
            color: #f10215;
            cursor: default;
            user-select: none;
        }
        >.navbar {
            height: 30px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            position: relative;
            margin-bottom: 10px;
            >a {
                display: flex;
                justify-content: center;
                align-items: center;
                color: rgba(0, 0, 0, 0.65);
                width: 80px;
                height: 30px;
                &:last-child {
                    position: absolute;
                    top: 0;
                    right: 20px;
                }
                &:hover {
                    color: #f10215;
                }
                &.active {
                    color: #f10215;
                }
                >span.number {
                    font-size: 14px;
                    font-weight: 700;
                    margin-left: 5px;
                    color: #f10215;
                }
            }
        }
        >.title-bar {

            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            user-select: none;
            cursor: default;
            height: 30px;
            margin-bottom: 10px;
            display: none;
            @media (min-width: 768px) {
                display: flex;
            }
            >li {
                width: 100px;
                font-size: 12px;
                transform: translateX(-20px);
                display: none;
                @media (min-width: 768px) {
                    display: block;
                }
                &.info {
                    flex-grow: 1;
                    transform: translateX(0);
                    display: block;
                    text-align: center;
                    @media (min-width: 768px) {
                        text-align: start;
                    }
                }
                &.price {
                    width: 140px;
                }
                &.action {
                    text-align: center;
                }
            }
        }
        >.goods {
            padding: 20px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            margin-bottom: 30px;
            >li {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px dashed rgba(0, 0, 0, 0.15);
                position: relative;
                padding-top: 50px;
                margin-bottom: 10px;
                flex-wrap: wrap;
                @media (min-width: 768px) {
                    flex-wrap: nowrap;
                }
                >.order-info {
                    padding: 0 20px;
                    position: absolute;
                    height: 40px;
                    top: 0;
                    left: -20px;
                    right: -20px;
                    bottom: 0;
                    background: rgb(245, 245, 245);
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    >span {
                        font-size: 12px;
                        margin-right: 10px;
                        cursor: default;
                        &.number {
                            font-weight: 700;
                        }
                        &:nth-child(2) {
                            margin-right: 0;
                        }
                    }
                }
                >div {
                    width: 100px;
                    font-size: 12px;
                    &.info {
                        flex-grow: 1;
                        padding-right: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        width: 100%;
                        @media (min-width: 768px) {
                            width: 100px;
                        }
                        >img {
                            width: 80px;
                            height: 80px;
                            flex-shrink: 0;
                            cursor: pointer;
                            margin-right: 15px;
                        }
                        >span {
                            cursor: pointer;
                            font-size: 12px;
                            &:hover {
                                color: #f10215;
                                text-decoration: underline;
                            }
                        }
                    }
                    &.price {
                        cursor: default;
                        width: 110px;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-content: center;
                        margin-top: 10px;
                        >span {
                            font-size: 12px;
                            font-weight: 700;
                            &.origin {
                                font-size: 12px;
                                color: rgba(0, 0, 0, 0.45);
                                text-decoration: line-through;
                                margin-left: 4px;
                                @media (min-width: 768px) {
                                    margin-left: 0;
                                }
                                >span {
                                    color: rgba(0, 0, 0, 0.45);
                                    font-size: 12px;
                                    font-weight: 400;
                                }
                            }
                        }
                        span.text {
                            display: none;
                        }
                        @media (min-width: 768px) {
                            flex-direction: column;
                            margin-top: 0;
                            width: 140px;
                            span.text {
                                display: inline;
                            }
                        }
                    }
                    &.count {
                        font-weight: 700;
                        cursor: default;
                        padding-left: 0.5em;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 10px;
                        width: 60px;
                        >span.text {
                            font-size: 12px;
                            display: inline;
                        }
                        @media (min-width: 768px) {
                            width: 100px;
                            justify-content: flex-start;
                            >span.text {
                                display: none;
                            }
                            margin-top: 0;
                        }
                    }
                    &.total {
                        font-weight: 700;
                        cursor: default;
                        margin-top: 10px;
                        width: 80px;
                        @media (min-width: 768px) {
                            width: 100px;
                            margin-top: 0;
                        }
                    }
                    &.action {
                        margin-top: 10px;
                        width: 80px;
                        @media (min-width: 768px) {
                            margin-top: 0;
                            width: 100px;
                        }
                        >a {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 4px 0;
                            color: rgba(0, 0, 0, 0.65);
                            font-size: 12px;
                            text-align: center;
                            &:hover {
                                text-decoration: underline;
                                color: #f10215;
                            }
                            &.delivery {
                                background: #1890ff;
                                color: rgba(255, 255, 255, 0.85);
                                border-radius: 2px;
                                &:hover {
                                    text-decoration: none;
                                }
                            }
                            >.icon {
                                width: 16px;
                                height: 16px;
                                margin-right: 4px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>