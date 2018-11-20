<template>
    <div class="index">
        <div class="profile" v-if="user">
            <h4 class="title">个人资料</h4>
            <div class="user-info">
                <p>
                    <label>用户名：</label>
                    {{user.username}}
                </p>
                <p>
                    <label>昵称：</label>
                    <sun-input style="width:240px;" v-model="nickyname"></sun-input>
                </p>
                <p>
                    <label>性别：</label>
                    <label><input type="radio" value="male" v-model="gender">男</label>
                    <label><input type="radio" value="female" v-model="gender">女</label>
                </p>
            </div>
            <div class="btn" role="button" @click="onSave">保存</div>
        </div>
        <h4 class="title">
            猜你喜欢
        </h4>
        <div class="recommend">
            <template v-if="recommend&&recommend.length">
                <div class="sku-wrapper" v-for="product in recommend" :key="product.id">
                    <sun-sku :product="product" @add-to-cart="handleAddToCart($event)"></sun-sku>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import sunInput from '@/components/input.vue'
    import sunSku from '@/components/sku.vue'
    import storeMixin from '@/mixin/storeMixin'
    export default {
        name: 'Index',
        mixins: [storeMixin],
        components: { sunInput, sunSku },
        data() { return { nickyname: '', gender: '' } },
        watch: {
            user: {
                handler(val) {
                    if (val) {
                        this.nickyname = val.nickyname
                        this.gender = val.gender || ''
                    }
                },
                deep: true,
                immediate: true
            }
        },
        methods: {
            onSave() {
                this.changeProfile({ nickyname: this.nickyname, gender: this.gender })
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
    .index {
        border-radius: 2px;
        >.profile {
            border: 1px solid rgba(0, 0, 0, .15);
            border-radius: 2px;
            >.title {
                border-bottom: 1px solid rgba(0, 0, 0, .15);
                padding-bottom: 5px;
                padding-left: 20px;
                cursor: default;
                user-select: none;
            }
            >.user-info {
                margin-left: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(0, 0, 0, .15);
                >p {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    >label {
                        width: 6em;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        &:not(:first-child) {
                            width: 3em;
                        }
                    }
                }
            }
            >.btn {
                margin: 20px 80px;
                width: 80px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                background: lighten(#f10215, 20%);
                color: rgba(255, 255, 255, .85);
                cursor: pointer;
                user-select: none;
                border-radius: 2px;
                &:hover {
                    background: lighten(#f10215, 10%);
                }
            }
        }
        >.title {
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            font-size: 14px;
            padding: 10px 20px;
            cursor: pointer;
            user-select: none;
            text-align: end;
            color: #f10215;
        }
        >.recommend {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px;
            flex-direction: column;
            @media (min-width: 768px) {
                flex-direction: row;
            }
            >.sku-wrapper {
                width: 300px;
                @media (min-width: 768px) {
                    width: calc(760px / 3);
                }
            }
        }
    }
</style>