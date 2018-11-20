<template>
    <div class="sun-sku">
        <div class="show-img" @click="onDetail(product)">
            <div class="icon-wrapper" v-if="product.discount<product.price">
                <x-icon name="sale" class="icon"></x-icon>
            </div>
            <img :src="product.main_image" v-if="currentImg==='main'">
            <img :src="product.sub_image" v-else>
        </div>
        <div class="focus-img">
            <div class="cover" @mouseenter="currentImg='main'" :class="{active:currentImg==='main'}">
                <img :src="product.main_image">
            </div>
            <div class="feature" @mouseenter="currentImg='sub'" :class="{active:currentImg==='sub'}">
                <img :src="product.sub_image">
            </div>
        </div>
        <div class="goods-price">
            <div class="price">
                <span>￥</span><span class="number">{{product.price}}</span><span>.00</span>
            </div>
            <div class="origin-price" v-if="product.discount<product.price">
                <span>￥{{product.price}}.00</span>
            </div>
        </div>
        <div class="title" @click="onDetail(product)">
            {{product.title}}
        </div>
        <div class="actions">
            <div class="detail" role="button" @click="onDetail(product)">
                <x-icon name="detail" class="icon"></x-icon>
                查看详情
            </div>
            <div class="add-to-cart" role="button" @click="onAddToCart(product)">
                <x-icon name="cart" class="icon"></x-icon>
                加入购物车
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from '@/components/icon/icon.vue'
    export default {
        name: 'SunSku',
        components: { xIcon },
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return { currentImg: 'main' }
        },
        methods: {
            onDetail(product) {
                window.open(`/product.html?id=${product.id}`, '_blank')
            },
            onAddToCart(product) {
                this.$emit('add-to-cart', product)
            }
        }
    }
</script>
<style scoped lang="scss">
    .sun-sku {
        padding: 10px 0;
        overflow: hidden;
        margin-bottom: 10px;
        >.show-img {
            margin: 0 auto;
            width: 200px;
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            >.icon-wrapper {
                position: absolute;
                top: 0;
                right: 0;
                width: 50px;
                height: 40px;
                background: #fff;
                transform: rotateZ(45deg) translateX(4px) translateY(-27px);
                display: flex;
                justify-content: center;
                align-items: center;
                >.icon {
                    color: #f10215;
                    width: 35px;
                    height: 35px;
                }
            }

            >img {
                width: 200px;
                border-radius: 2px;
            }
        }
        >.focus-img {
            margin: 10px auto;
            width: 200px;
            height: 32px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >div {
                width: 34px;
                height: 34px;
                display: flex;
                padding: 1px;
                justify-content: flex-start;
                align-items: center;
                border: 1px solid transparent;
                border-radius: 2px;
                margin-right: 2px;
                >img {
                    width: 30px;
                    border-radius: 2px;
                }
                &.active {
                    border: 1px solid #f10215;
                }
            }
        }
        >.goods-price {
            margin: 10px auto;
            width: 200px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >.price {
                cursor: default;
                margin-right: 4px;
                >span {
                    font-weight: 700;
                    font-size: 12px;
                    color: #f10215;
                    &.number {
                        font-size: 18px;
                    }
                }
            }
            >.origin-price {
                cursor: default;
                >span {
                    font-size: 12px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, .45);
                    text-decoration: line-through;
                }
            }
        }
        >.title {
            cursor: pointer;
            margin: 10px auto;
            width: 200px;
            font-size: 12px;
            height: 60px;
            &:hover {
                color: #f10215;
            }
        }
        >.actions {
            cursor: pointer;
            margin: 10px auto;
            width: 200px;
            font-size: 12px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >div {
                width: 100px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                border: 1px solid rgba(0, 0, 0, .15);
                border-left: none;
                &:first-child {
                    border-left: 1px solid rgba(0, 0, 0, .15);
                    border-top-left-radius: 2px;
                    border-bottom-left-radius: 2px;
                }
                &:last-child {
                    border-top-right-radius: 2px;
                    border-bottom-right-radius: 2px;
                }
                >.icon {
                    margin-right: 2px;
                }
                &.detail {
                    user-select: none;
                    &:hover {
                        background: rgba(0, 0, 0, .04);
                    }
                }
                &.add-to-cart {
                    user-select: none;
                    &:hover {
                        background: lighten(#f10215, 50%);
                        color: #f10215;
                    }
                }
            }
        }
        &:hover {
            box-shadow: 2px 0 8px rgba(0, 0, 0, .15);
        }
    }
</style>