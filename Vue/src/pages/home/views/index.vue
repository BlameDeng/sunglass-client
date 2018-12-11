<template>
    <div class="index">
        <div class="slides">
            <sun-slides :duration="5000">
                <div class="banner">
                    <img src="http://localhost:8000/img/banner1.jpg" />
                </div>
                <div class="banner">
                    <img src="http://localhost:8000/img/banner2.jpg" />
                </div>
                <div class="banner">
                    <img src="http://localhost:8000/img/banner3.jpg" />
                </div>
            </sun-slides>
        </div>
        <div class="new-arrival">
            <h1 class="title">New Arrival</h1>
            <div class="product-wrapper">
                <template v-if="newArrival&&newArrival.length">
                    <div class="product" v-for="product in newArrival" :key="product.id" @click="onClickProduct(product)">
                        <h2 class="name">{{product.name}}</h2>
                        <img :src="product.sub_image">
                        <span class="price">￥{{product.price.toFixed(2)}}</span>
                        <div class="add" @click.stop="onAdd(product)">
                            <x-icon name="cart" class="icon"></x-icon>
                            添加到购物车
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="lorem">
            <div class="upper">
                <div class="img-wrapper">
                    <img src="http://localhost:8000/img/layer1.png">
                </div>

                <div class="text">
                    <h2>The Difference is<br>
                        in The Lens</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div class="img-wrapper">
                    <img src="http://localhost:8000/img/layer2.png">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from '@/components/icon/icon.vue'
    import sunSlides from '@/components/slides.vue'
    import storeMixin from '@/mixin/storeMixin'
    export default {
        name: 'Index',
        components: { xIcon, sunSlides },
        mixins: [storeMixin],
        methods: {
            onAdd(product) {
                if (!this.isLogin) {
                    window.open('/member.html', '_blank')
                    return
                }
                this.addToCart({ count: 1, id: product.id })
            },
            onClickProduct(product) {
                window.open(`/product.html?id=${product.id}`, '_blank')
            }
        }
    }
</script>
<style scoped lang="scss">
    .index {
        width: 100%;
        >.slides {
            width: 100%;
            .banner {
                width: 100%;
                flex-shrink: 0;
                >img {
                    max-width: 100%;
                }
            }
        }
        >.new-arrival {
            width: 70%;
            min-width: 300px;
            margin: -50px auto 0;
            background: #fff;
            position: relative;
            padding: 10px;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
            @media (min-width: 768px) {
                padding: 20px;
            }
            >.title {
                text-align: center;
                font-weight: 600;
                cursor: default;
                user-select: none;
                margin-bottom: 10px;
                font-size: 18px;
                line-height: 26px;
                @media (min-width: 768px) {
                    margin-bottom: 20px;
                    font-size: 30px;
                    line-height: 38px;
                }
            }
            >.product-wrapper {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                >.product {
                    width: 33%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding-top: 0;
                    box-shadow: none;
                    transition: all 0.2s linear;
                    @media (min-width: 768px) {
                        padding-top: 20px;
                    }
                    >.name {
                        font-size: 12px;
                        font-weight: 600;
                        margin-bottom: 10px;
                        @media (min-width: 768px) {
                            font-size: 22px;
                            font-weight: 500;
                            margin-bottom: 20px;
                        }
                    }
                    >img {
                        max-width: 100%;
                        margin: 20px 0;
                        @media (min-width: 768px) {
                            margin: 40px 0;
                        }
                    }
                    >.price {
                        font-size: 16px;
                        font-weight: 600;
                    }
                    >.add {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        padding: 5px 0;
                        margin-top: 20px;
                        transition: all 0.2s linear;
                        user-select: none;
                        background: #f10215;
                        color: #fff;
                        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
                        font-size: 12px;
                        >.icon {
                            display: none;
                            width: 18px;
                            height: 18px;
                            margin-right: 2px;
                        }
                        @media (min-width: 768px) {
                            padding: 15px 0;
                            background: transparent;
                            color: transparent;
                            box-shadow: none;
                            font-size: 14px;
                            >.icon {
                                display: inline-flex;
                            }
                        }
                    }
                    &:hover {
                        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
                        >.add {
                            background: #f10215;
                            color: #fff;
                            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
                        }
                    }
                }
            }
        }
        >.lorem {
            margin: 40px 0;
            >.upper {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #fff;
                width: 100%;
                >.img-wrapper {
                    width: 30%;
                    overflow: hidden;
                    flex-shrink: 0;
                    >img {
                        border-radius: 2px;
                        max-width: 100%;
                        transition: all 0.2s linear;
                        &:hover {
                            transform: scale(1.2);
                        }
                    }
                }
                >.text {
                    width: 40%;
                    padding: 0 10px;
                    >h2 {
                        text-align: center;
                        font-weight: 600;
                        cursor: default;
                        margin: 10px 0;
                    }
                    >p {
                        text-align: center;
                        font-weight: 500;
                        cursor: default;
                    }
                }
            }
        }
    }
</style>