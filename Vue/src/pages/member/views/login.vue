<template>
    <div class="banner">
        <div class="login-wrapper">
            <div class="login">
                <div class="title">
                    <h2>账户登录</h2>
                </div>
                <div class="error" v-if="errorInfo">
                    <x-icon name="error" class="icon"></x-icon>{{errorInfo}}
                </div>
                <div class="username">
                    <sun-input placeholder="用户名" icon="username" v-model.trim="username" @focus="errorInfo=''"></sun-input>
                </div>
                <div class="password">
                    <sun-input placeholder="密码" icon="lock" type="password" v-model.trim="password" @focus="errorInfo=''"></sun-input>
                </div>
                <div class="captcha">
                    <sun-captcha ref="captcha" @focus="errorInfo=''"></sun-captcha>
                </div>
                <div class="submit">
                    <button @click="onLogin">登录</button>
                </div>
                <div class="tips">
                    如果账户未注册，将自动为您注册
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from '@/components/icon/icon.vue'
    import sunInput from '@/components/input.vue'
    import sunCaptcha from '@/components/captcha.vue'
    import storeMixin from '@/mixin/storeMixin'
    export default {
        name: 'Login',
        mixins: [storeMixin],
        components: { xIcon, sunInput, sunCaptcha },
        data() {
            return {
                username: '',
                password: '',
                errorInfo: ''
            }
        },
        mounted() {
            document.title = '会员登录'
            this.user && this.$router.push('/')
        },
        methods: {
            validate() {
                const pattern1 = /^[\u4e00-\u9fa5\w]{5,10}$/
                const pattern2 = /.{6,18}/
                if (!pattern1.test(this.username)) {
                    return '账户名为5到10个字符'
                }
                if (!pattern2.test(this.password)) {
                    return '密码为6到18个字符'
                }
            },
            onLogin() {
                if (!this.username || !this.password) {
                    this.errorInfo = '请输入账号和密码！'
                    return
                }
                if (this.validate()) {
                    this.errorInfo = this.validate()
                } else {
                    this.$refs.captcha.verify().then(res => {
                        this.userLogin()
                    }).catch(() => { return })
                }
            },
            userLogin() {
                this.login({ username: this.username, password: this.password })
                    .then(res => {
                        this.setLogin(res.isLogin)
                        this.setUser(res.data)
                        this.$router.push('/')
                    })
                    .catch(error => {
                        this.errorInfo = error.msg
                        this.$refs.captcha.getCaptcha()
                    })
            }
        }
    }
</script>
<style scoped lang="scss">
    .banner {
        width: 100%;
        background: url('http://localhost:8000/img/banner1.jpg');
        background-position: center center;
        background-size: cover;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        >.login-wrapper {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            height: 100%;
            position: relative;
            flex-grow: 1;
            >.login {
                width: 100%;
                max-width: 400px;
                height: 350px;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                padding: 0 20px;
                background: rgba(255, 255, 255, .75);
                border-radius: 2px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: stretch;
                >.title {
                    border-bottom: 1px solid rgba(0, 0, 0, .15);
                    margin: 0 -20px;
                    margin-bottom: 20px;
                    >h2 {
                        color: lighten(#f10215, 20%);
                        margin: 5px 0;
                        text-align: center;
                        cursor: default;
                        user-select: none;
                    }
                }
                >.error {
                    position: absolute;
                    top: 70px;
                    left: 20px;
                    width: 360px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #f10215;
                    border-radius: 2px;
                    background: lighten(#f10215, 50%);
                    cursor: default;
                    user-select: none;
                    font-size: 12px;
                    color: rgba(0, 0, 0, .45);
                    >.icon {
                        width: 14px;
                        height: 14px;
                        color: #f10215;
                        margin-right: 2px;
                    }
                }
                >.submit {
                    >button {
                        display: block;
                        width: 100%;
                        background: lighten(#f10215, 20%);
                        color: rgba(255, 255, 255, .85);
                        border: none;
                        box-shadow: none;
                        font-size: 16px;
                        font-weight: 500;
                        padding: 8px 0;
                        border-radius: 2px;
                        cursor: pointer;
                        &:focus {
                            outline: none;
                        }
                        &:hover {
                            background: lighten(#f10215, 10%);
                        }
                    }
                }
                >.tips {
                    font-size: 12px;
                    color: rgba(0, 0, 0, .45);
                    text-align: center;
                    cursor: default;
                    user-select: none;
                }
            }
        }
    }
</style>