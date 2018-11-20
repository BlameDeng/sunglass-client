<template>
    <div class="top-bar">
        <div class="top-userbar">
            <div class="user">
                <span class="icon-wrapper">
                    <x-icon name="user" class="icon" @click="onClickUser"></x-icon>
                </span>
                <span class="username" v-if="user" @click="onClickUser">{{user.nickyname||user.username}}</span>
                <span class="username" v-else @click="onClickUser">未登录</span>
                <span class="icon-wrapper">
                    <x-icon name="cart" class="icon" @click="onClickAction('cart')"></x-icon>
                    <span class="badge" v-if="cart">{{cart.products.length}}</span>
                </span>
            </div>
            <transition name="actions-fade">
                <div class="actions" v-show="actionsVisible">
                    <div class="action" @click="onClickAction('cart')">购物车</div>
                    <div class="action" @click="onClickAction('member')">账户管理</div>
                    <div class="action" @click="onClickAction('logout')">注销登录</div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import storeMixin from '@/mixin/storeMixin'
    import xIcon from '@/components/icon/icon.vue'
    export default {
        name: 'sunTopbar',
        mixins: [storeMixin],
        components: { xIcon },
        data() {
            return { actionsVisible: false }
        },
        watch: {
            actionsVisible(val) {
                if (val) {
                    document.addEventListener('click', this.listenDocument)
                } else {
                    document.removeEventListener('click', this.listenDocument)
                }
            }
        },
        mounted() {
            this.check().catch(error => {})
        },
        beforedestroy() {
            document.removeEventListener('click', this.listenDocument)
        },
        methods: {
            listenDocument() {
                this.actionsVisible = false
            },
            onClickUser() {
                if (!this.isLogin) {
                    window.open('/member.html', '_blank')
                    return
                }
                this.actionsVisible = true
            },
            onClickAction(type) {
                if (type === 'logout') {
                    this.logout()
                        .then(res => {
                            localStorage.removeItem('user')
                            this.setLogin(res.isLogin)
                            this.setUser(null)
                        })
                        .catch(error => {
                            this.setLogin(error.isLogin)
                            this.setUser(null)
                        })
                } else if (type === 'member') {
                    window.open('/member.html', '_blank')
                } else if (type === 'cart') {
                    window.open('/cart.html', '_blank')
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .top-bar {
        background: rgb(250, 250, 250);
        width: 100%;
        >.top-userbar {
            max-width: 1200px;
            height: 30px;
            margin: 0 auto;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: relative;
            padding-right: 20px;
            >.user {
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                >.icon-wrapper {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    cursor: pointer;
                    position: relative;
                    &:last-child {
                        margin-left: 10px;
                    }
                    >.badge {
                        user-select: none;
                        position: absolute;
                        top: -6px;
                        right: -6px;
                        background: #f10215;
                        color: #fff;
                        font-size: 14px;
                        border-radius: 50%;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        width: 18px;
                        height: 18px;
                        transform: scale(0.7);
                        pointer-events: none;
                    }
                    >.icon {
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                    }
                }
                >.username {
                    margin-left: 2px;
                    cursor: pointer;
                }
            }
            >.actions {
                width: 100px;
                text-align: center;
                position: absolute;
                z-index: 5;
                top: 100%;
                right: 20px;
                cursor: pointer;
                background: #fff;
                user-select: none;
                border: 1px solid rgba(0, 0, 0, .15);
                border-top: none;
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
                box-shadow: 0 4px 8px -4px rgba(0, 0, 0, .15);
                >.action {
                    height: 28px;
                    line-height: 28px;
                    &:last-child {
                        border-bottom-left-radius: 2px;
                        border-bottom-right-radius: 2px;
                    }
                    &:hover {
                        color: #f10215;
                    }
                }
            }
        }
    }
    .actions-fade-enter-active, .actions-fade-leave-active {
        transition: opacity .3s ease-in-out;
    }
    .actions-fade-enter, .actions-fade-leave-to {
        opacity: 0;
    }
</style>