<template>
    <div class="sun-sider">
        <div class="link">
            <div class="user" @click="onLink('member')">
                <x-icon name="user" class="icon"></x-icon>
            </div>
            <div class="cart" @click="onLink('cart')">
                <x-icon name="cart" class="icon"></x-icon>
                <span>购<br>物<br>车</span>
                <span class="count">{{(cart&&cart.products.length)||0}}</span>
            </div>
        </div>
        <div class="to-top" @mouseenter="tipsVisible=true" @mouseleave="tipsVisible=false" @click="onClickToTop">
            <transition name="tips-slide">
                <div class="tips" v-show="tipsVisible">返回顶部</div>
            </transition>
            <div class="top">
                <x-icon name="up" class="icon"></x-icon>
                <span>TOP</span>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from '@/components/icon/icon.vue'
    import smoothScroll from '@/utils/smoothScroll'
    import storeMixin from '@/mixin/storeMixin'
    export default {
        name: 'sunSider',
        mixins: [storeMixin],
        components: { xIcon },
        data() {
            return { tipsVisible: false }
        },
        methods: {
            onLink(type) {
                if (!this.isLogin || type === 'member') {
                    window.open('/member.html', '_blank')
                } else if (type === 'cart') {
                    window.open('/cart.html', '_blank')
                }
            },
            onClickToTop() {
                smoothScroll(window, { x: 0, y: 0 })
            }
        }
    }
</script>
<style scoped lang="scss">
    .sun-sider {
        width: 28px;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        background: transparent;
        color: rgba(255, 255, 255, 0.85);
        z-index: 20;
        >.link {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            position: absolute;
            top: 20%;
            left: 0;
            >.user {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                cursor: pointer;
                padding: 10px 0;
                background: #383838;
                border-top-right-radius: 2px;
                border-top-left-radius: 2px;
                >.icon {
                    width: 20px;
                    height: 20px;
                }
                &:hover {
                    background: #ffaa01;
                }
            }
            >.cart {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                cursor: pointer;
                padding: 10px 0;
                background: #383838;
                border-bottom-right-radius: 2px;
                border-bottom-left-radius: 2px;
                >.icon {
                    width: 20px;
                    height: 20px;
                }
                >span {
                    margin-top: 10px;
                    user-select: none;
                    &.count {
                        display: inline-flex;
                        font-size: 12px;
                        width: 24px;
                        height: 20px;
                        justify-content: center;
                        align-items: center;
                        background: #f10215;
                        border-radius: 8px;
                    }
                }
                &:hover {
                    background: #ffaa01;
                }
            }
        }
        >.to-top {
            width: 100%;
            cursor: pointer;
            position: absolute;
            bottom: 10px;
            left: 0;
            height: 36px;
            background: #383838;
            >.tips {
                position: absolute;
                bottom: 0;
                right: 28px;
                font-size: 12px;
                width: 60px;
                height: 36px;
                color: rgba(0, 0, 0, 0.85);
                background: #ffaa01;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top-left-radius: 2px;
                border-bottom-left-radius: 2px;
                user-select: none;
            }
            >.top {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: relative;
                background: #383838;
                >.icon {
                    width: 14px;
                    height: 14px;
                }
                >span {
                    font-size: 12px;
                    font-weight: 600;
                    user-select: none;
                }
            }
            &:hover {
                background: #ffaa01;
                >.top {
                    background: #ffaa01;
                }
            }
        }
        @media (min-width: 1300px) {
            background: #383838;
            >.link {
                >.cart {
                    background: #383838;
                }
            }
            >.to-top {
                background: #383838;
                >.top {
                    background: #383838;
                }
            }
        }
    }
    .tips-slide-enter-active,
    .tips-slide-leave-active {
        transition: transform 0.3s linear;
    }
    .tips-slide-enter-to,
    .tips-slide-leave {
        transform: translateX(0);
    }
    .tips-slide-enter,
    .tips-slide-leave-to {
        transform: translateX(100%);
    }
</style>