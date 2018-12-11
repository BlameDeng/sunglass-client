<template>
    <div class="account">
        <div class="title-wrapper">
            <h4 class="title" :class="{active:currentTab==='password'}">
                <span @click="onClickTab('password')">
                    修改密码
                </span>
            </h4>
            <h4 class="title" :class="{active:currentTab==='address'}">
                <span @click="onClickTab('address')">
                    我的收货地址
                </span>
            </h4>
        </div>
        <div class="password" v-if="currentTab==='password'">
            <p>
                <label>原密码：</label>
                <sun-input style="width:240px;" type="password" v-model="password"></sun-input>
            </p>
            <p>
                <label>新密码：</label>
                <sun-input style="width:240px;" type="password" v-model="newPassword"></sun-input>
            </p>
            <p>
                <label>确认新密码：</label>
                <sun-input style="width:240px;" type="password" v-model="newPasswordConfirm"></sun-input>
            </p>
        </div>
        <div class="address" v-else>
            <div class="wrapper">
                <p>
                    <label>收货人：</label>
                    <sun-input style="width:200px;" v-model="name"></sun-input>
                </p>
                <p>
                    <label>手机号码：</label>
                    <sun-input style="width:200px;" v-model="phone"></sun-input>
                </p>
            </div>
            <p>
                <label>地址信息：</label>
                <sun-input style="width:500px;" placeholder="省/市/区" v-model="address"></sun-input>
            </p>
            <p>
                <label>详细地址：</label>
                <sun-input style="width:500px;" placeholder="详细地址，如：门牌、街道、村镇" v-model="detail"></sun-input>
            </p>
            <p v-if="receiver">
                现有收货地址：<span>{{`${receiver.name||''} ${receiver.phone||''} ${receiver.address||''} ${receiver.detail||''}`}}</span>
            </p>
        </div>
        <div class="btn" role="button" @click="onSave">保存</div>
    </div>
</template>
<script>
    import sunInput from '@/components/input.vue'
    import storeMixin from '@/mixin/storeMixin'
    export default {
        name: 'Account',
        mixins: [storeMixin],
        components: { sunInput },
        data() {
            return {
                currentTab: 'password',
                password: '',
                newPassword: '',
                newPasswordConfirm: '',
                name: '',
                phone: '',
                address: '',
                detail: ''
            }
        },
        mounted() {
            this.isLogin && this.getReceiver()
        },
        methods: {
            onClickTab(tab) {
                this.currentTab = tab
            },
            onSave() {
                if (this.currentTab === 'password') {
                    this.onChangePassword()
                } else if (this.currentTab === 'address') {
                    this.changeAddress()
                }
            },
            onChangePassword() {
                const pattern = /.{6,18}/
                if (!this.password || !this.newPassword || !this.newPasswordConfirm) {
                    this.$info({ message: '密码不能为空！' })
                    return
                }
                if (this.newPassword === this.password) {
                    this.$info({ message: '新密码不能与原密码相同！' })
                    return
                }
                if (this.newPassword !== this.newPasswordConfirm) {
                    this.$info({ message: '两次输入的新密码不一致！' })
                    return
                }
                let result = true
                let array = [this.password, this.newPassword, this.newPasswordConfirm]
                array.forEach(str => {
                    if (!pattern.test(str)) {
                        result = pattern.test(str)
                    }
                })
                if (!result) {
                    this.$info({ message: '密码为6到18位字符！' })
                    return
                }
                this.changePassword({ username: this.user.username, password: this.password, newPassword: this.newPassword })
                    .then(res => {
                        this.$success({ message: '密码修改成功' })
                        this.password = ''
                        this.newPassword = ''
                        this.newPasswordConfirm = ''
                    })
                    .catch(error => { this.$error({ message: error.msg }) })
            },
            changeAddress() {
                if (!this.name || !this.phone || !this.address || !this.detail) {
                    this.$info({ message: '联系人、手机号码、地址不能为空！' })
                    return
                }
                if (!/^[\d]+$/.test(this.phone)) {
                    this.$info({ message: '手机号码必须为数字！' })
                    return
                }
                this.updateReceiver({ name: this.name, phone: this.phone, address: this.address, detail: this.detail })
                    .then(res => {
                        this.$success({ message: '修改收货人信息成功' })
                    })
                    .catch(error => {
                        this.$error({ message: error.msg })
                    })
            }
        }
    }
</script>
<style scoped lang="scss">
    .account {
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: 2px;
        >.title-wrapper {
            display: flex;
            justify-content: flex-start;
            >.title {
                border-bottom: 1px solid rgba(0, 0, 0, .15);
                padding-bottom: 5px;
                padding-left: 20px;
                cursor: pointer;
                user-select: none;
                >span {
                    padding: 4px 0;
                }
                &:last-child {
                    flex-grow: 1;
                }
                &.active {
                    color: #f10215;
                }
            }
        }
        >.password, >.address {
            margin-left: 20px;
            padding-bottom: 20px;
            padding-right: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, .15);
            p {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                cursor: default;
                >label {
                    width: 5em;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    flex-shrink: 0;
                }
            }
            >.wrapper {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                flex-direction: column;
                @media (min-width: 768px) {
                    flex-direction: row;
                    align-items: center;
                }
                >p {
                    &:last-child {
                        margin-left: 0;
                        @media (min-width: 768px) {
                            margin-left: 17px;
                        }
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
</style>