<template>
    <div class="cart">
        <div class="title">
            我的购物车
        </div>
        <ul class="title-bar">
            <li class="label" @click="selectAll">
                <label :class="{selected:allSelected}"></label>
                <span>全选</span>
            </li>
            <li class="info">商品信息</li>
            <li class="price">单价</li>
            <li class="count">数量</li>
            <li>金额</li>
            <li class="action">操作</li>
        </ul>
        <ul class="goods">
            <template v-if="cart&&cart.products&&cart.products.length">
                <li v-for="product in cart.products" :key="product.id">
                    <div class="label">
                        <label @click="onProductLabel(product.id)" :class="{selected:selectedIds&&selectedIds.indexOf(product.id)>-1}"></label>
                    </div>
                    <div class="info">
                        <img :src="product.main_image" @click="onProductDetail(product)">
                        <span @click="onProductDetail(product)">
                            {{product.title}}
                        </span>
                    </div>
                    <div class="price">
                        <span>￥{{product.discount.toFixed(2)}}</span>
                        <span class="origin" v-if="product.discount<product.price">
                            <span class="text">原价</span>
                            ￥{{product.price.toFixed(2)}}
                        </span>
                    </div>
                    <div class="count">
                        <span class="minus" @click="changeProductCount(product,-1)" :class="{disabled:product.count<=1}">-</span>
                        <input type="text" v-model.number="product.count" @blur="changeProductCount(product)">
                        <span class="plus" @click="changeProductCount(product,1)">+</span>
                    </div>
                    <div class="total">
                        <span>小计</span>
                        ￥{{(product.discount*product.count)&&(product.discount*product.count).toFixed(2)||'0.00'}}</div>
                    <div class="action">
                        <span @click="onClickDelete(product)">删除</span>
                    </div>
                </li>
            </template>
            <template v-else>
                <li class="else">购物车是空的哦~~~</li>
            </template>
        </ul>
        <ul class="action-bar">
            <li class="label" @click="selectAll">
                <label :class="{selected:allSelected}"></label>
                <span>全选</span>
            </li>
            <li class="info"></li>
            <li class="count">已选商品<span class="number">{{(selectedIds&&selectedIds.length)||0}}</span>件</li>
            <li class="total">合计<span class="number" v-if="total">{{'￥'+total.toFixed(2)}}</span></li>
            <li class="pay" :class="{disabled:!selectedIds||!selectedIds.length}" @click="onPay">结 算</li>
        </ul>
    </div>
</template>
<script>
    import storeMixin from '@/mixin/storeMixin'
    export default {
        name: 'Cart',
        mixins: [storeMixin],
        data() {
            return { selectedIds: null }
        },
        computed: {
            total() {
                if (this.selectedIds && this.selectedIds.length) {
                    let selectedProducts = []
                    this.cart.products.forEach(product => {
                        if (this.selectedIds.indexOf(product.id) > -1) {
                            selectedProducts.push(product)
                        }
                    })
                    return selectedProducts.reduce((prev, current) => {
                        return prev + current.discount * current.count
                    }, 0)
                } else {
                    return 0
                }
            },
            allSelected() {
                if (!this.selectedIds || !this.cart.products.length) { return false }
                if (this.selectedIds.length !== this.cart.products.length) {
                    return false
                }
                let ids1 = JSON.parse(JSON.stringify(this.selectedIds)).sort()
                let ids2 = this.cart.products.map(product => product.id).sort()
                let result = true
                for (let i = 0; i < ids2.length; i++) {
                    if (ids1[i] !== ids2[i]) {
                        result = false
                        break
                    }
                }
                return result
            }
        },
        methods: {
            changeProductCount(product, payload) {
                if (payload) {
                    if (product.count + payload <= 0) { return }
                    product.count += payload
                } else {
                    if (product.count < 0 || !product.count) { product.count = 1 }
                }
                this.addToCart({ count: product.count, id: product.id, type: 'changeCount' })
            },
            onClickDelete(product) {
                this.removeFromCart({ id: product.id })
            },
            onProductLabel(id) {
                this.selectedIds = this.selectedIds || []
                let index = this.selectedIds.indexOf(id)
                if (index === -1) {
                    this.selectedIds.push(id)
                } else {
                    this.selectedIds.splice(index, 1)
                }
            },
            selectAll() {
                if (!this.cart.products.length) {
                    return
                }
                if (this.allSelected) {
                    this.selectedIds = null
                } else {
                    this.selectedIds = this.selectedIds || []
                    this.cart.products.forEach(product => {
                        if (this.selectedIds.indexOf(product.id) === -1) {
                            this.selectedIds.push(product.id)
                        }
                    })
                }
            },
            onProductDetail(product) {
                window.open(`/product.html?id=${product.id}`, '_blank')
            },
            onPay() {
                if (!this.selectedIds || !this.selectedIds.length) { return }
                this.$router.push({ path: '/payment', query: { selectedIds: this.selectedIds } })
            }
        }
    }
</script>
<style scoped lang="scss">
    .cart {
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
        >.title-bar {
            align-items: center;
            padding-left: 20px;
            user-select: none;
            cursor: default;
            height: 30px;
            margin-bottom: 10px;
            flex-wrap: wrap;
            display: none;
            @media (min-width: 768px) {
                flex-wrap: nowrap;
                display: flex;
                justify-content: flex-start;
            }
            >li {
                width: 100px;
                font-size: 12px;
                &.label {
                    width: 60px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    >label {
                        background: #fff;
                        display: block;
                        width: 14px;
                        height: 14px;
                        border-radius: 2px;
                        margin-right: 4px;
                        border: 1px solid rgba(0, 0, 0, 0.15);
                        cursor: pointer;
                        &.selected {
                            &::after {
                                content: '';
                                display: block;
                                width: 10px;
                                height: 5px;
                                border-left: 2px solid #f10215;
                                border-bottom: 2px solid #f10215;
                                transform: rotateZ(-50deg) translateX(-1px) translateY(2px);
                                pointer-events: none;
                            }
                        }
                    }
                    >span {
                        font-size: 12px;
                    }
                }
                &.info {
                    flex-grow: 1;
                    text-align: center;
                    @media (min-width: 768px) {
                        text-align: start;
                    }
                }
                &.action {
                    width: 60px;
                }
                &.price {
                    padding-left: 40px;
                    width: 100px;
                    @media (min-width: 768px) {
                        width: 140px
                    }
                }
                &.count {
                    padding-left: 10px;
                    @media (min-width: 768px) {
                        padding-left: 0;
                    }
                }
            }
        }
        >.goods {
            padding: 20px;
            padding-right: 0;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 2px;
            >li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                flex-wrap: wrap;
                @media (min-width: 768px) {
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                }
                >div {
                    width: 100px;
                    font-size: 12px;
                    &.label {
                        width: 60px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        >label {
                            background: #fff;
                            display: block;
                            width: 14px;
                            height: 14px;
                            border-radius: 2px;
                            margin-right: 2px;
                            border: 1px solid rgba(0, 0, 0, 0.15);
                            cursor: pointer;
                            &.selected {
                                &::after {
                                    content: '';
                                    display: block;
                                    width: 10px;
                                    height: 5px;
                                    border-left: 2px solid #f10215;
                                    border-bottom: 2px solid #f10215;
                                    transform: rotateZ(-50deg) translateX(-1px) translateY(2px);
                                    pointer-events: none;
                                }
                            }
                        }
                        >span {
                            font-size: 12px;
                        }
                    }
                    &.info {
                        flex-grow: 1;
                        padding-right: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        >img {
                            width: 80px;
                            height: 80px;
                            flex-shrink: 0;
                            transform: translateX(-20px);
                            cursor: pointer;
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
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-content: center;
                        padding-left: 40px;
                        width: 100px;
                        @media (min-width: 768px) {
                            width: 140px;
                        }
                        >span {
                            font-size: 14px;
                            font-weight: 700;
                            &.origin {
                                font-size: 12px;
                                color: rgba(0, 0, 0, 0.45);
                                text-decoration: line-through;
                                >span {
                                    color: rgba(0, 0, 0, 0.45);
                                    font-size: 12px;
                                    font-weight: 400;
                                }
                            }
                        }
                        span.text {
                            display: none;
                            @media (min-width: 768px) {
                                display: inline;
                            }
                        }
                    }
                    &.count {
                        font-weight: 700;
                        cursor: default;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-top: 10px;
                        @media (min-width: 768px) {
                            margin-top: 0;
                        }
                        >span {
                            display: flex;
                            justify-content: center;
                            align-content: center;
                            width: 24px;
                            height: 24px;
                            font-size: 14px;
                            background: rgba(0, 0, 0, 0.05);
                            cursor: pointer;
                            border: 1px solid transparent;
                            user-select: none;
                            &:hover {
                                color: #f10215;
                                border-color: #f10215;
                            }
                            &.disabled {
                                cursor: not-allowed;
                                color: rgba(0, 0, 0, 0.45);
                                &:hover {
                                    color: rgba(0, 0, 0, 0.45);
                                    border-color: transparent;
                                }
                            }
                            &.minus {
                                border-top-left-radius: 2px;
                                border-bottom-left-radius: 2px;
                            }
                            &.plus {
                                border-top-right-radius: 2px;
                                border-bottom-right-radius: 2px;
                            }
                        }
                        >input {
                            display: block;
                            width: 35px;
                            text-align: center;
                            font-size: 12px;
                            box-shadow: none;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                            cursor: default;
                            &:focus {
                                outline: none;
                            }
                        }
                    }
                    &.total {
                        color: #f10215;
                        font-weight: 700;
                        cursor: default;
                        margin-top: 10px;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        >span {
                            display: inline;
                            font-size: 12px;
                            margin-right: 10px;
                        }
                        @media (min-width: 768px) {
                            margin-top: 0;
                            >span {
                                display: none;
                            }
                        }
                    }
                    &.action {
                        width: 60px;
                        margin-top: 10px;
                        @media (min-width: 768px) {
                            margin-top: 0;
                        }
                        >span {
                            font-size: 12px;
                            cursor: pointer;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
                &.else {
                    width: 100%;
                    font-size: 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: default;
                }
            }
        }
        >.action-bar {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 30px 0 30px 20px;
            user-select: none;
            cursor: default;
            height: 30px;
            background: rgba(0, 0, 0, 0.05);
            margin: 10px 0 20px 0;
            >li {
                width: 130px;
                font-size: 12px;
                >span {
                    &.number {
                        font-size: 16px;
                        margin: 0 4px;
                        color: #f10215;
                        font-weight: 700;
                    }
                }
                &.label {
                    width: 70px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    >label {
                        background: #fff;
                        display: block;
                        width: 14px;
                        height: 14px;
                        border-radius: 2px;
                        margin-right: 4px;
                        border: 1px solid rgba(0, 0, 0, 0.15);
                        cursor: pointer;
                        &.selected {
                            &::after {
                                content: '';
                                display: block;
                                width: 10px;
                                height: 5px;
                                border-left: 2px solid #f10215;
                                border-bottom: 2px solid #f10215;
                                transform: rotateZ(-50deg) translateX(-1px) translateY(2px);
                                pointer-events: none;
                            }
                        }
                    }
                    >span {
                        font-size: 12px;
                        &.number {
                            color: #f10215;
                            font-weight: 700;
                        }
                    }
                }
                &.info {
                    flex-grow: 1;
                }
                &.pay {
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    font-size: 18px;
                    color: rgba(255, 255, 255, .85);
                    background: #f10215;
                    border-top-right-radius: 2px;
                    border-bottom-right-radius: 2px;
                    cursor: pointer;
                    &.disabled {
                        background: #B0B0B0;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
</style>