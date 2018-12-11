<template>
    <footer class="sun-footer">
        <div class="footer-inner">
            <div class="link">
                <div class="logo" @click="onClick">Sunglass<sup>&reg;</sup></div>
                <div class="icons">
                    <x-icon name="github" class="icon" @click="onLink('github')"></x-icon>
                    <x-icon name="jianshu" class="icon" @click="onLink('jianshu')"></x-icon>
                </div>
            </div>
            <div class="portfolio">
                <div>Portfolio</div>
                <a href="https://xue-ui.com.cn" target="_blank">Xue-ui</a>
                <a href="https://github.com/BlameDeng/todos" target="_blank">Todos</a>
            </div>
        </div>
    </footer>
</template>
<script>
    import xIcon from '@/components/icon/icon.vue'
    import smoothScroll from '@/utils/smoothScroll'
    export default {
        name: 'sunFooter',
        components: { xIcon },
        methods: {
            onClick() {
                smoothScroll(window, { x: 0, y: 0 })
            },
            onLink(type) {
                if (type === 'github') {
                    window.open('https://github.com/BlameDeng/sun-server-demo', '_blank')
                } else {
                    window.open('https://www.jianshu.com/u/d12c8982dc3c', '_blank')
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .sun-footer {
        height: 80px;
        background: #383838;
        width: 100%;
        >.footer-inner {
            max-width: 1200px;
            margin: 0 auto;
            color: rgba(255, 255, 255, .85);
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0 25px;
            @media (min-width: 1250px) {
                padding: 0;
            }
            >.link {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                height: 100%;
                >.logo {
                    font-size: 24px;
                    font-weight: 600;
                    user-select: none;
                    margin-bottom: 5px;
                    cursor: pointer;
                }
                >.icons {
                    >.icon {
                        width: 18px;
                        height: 18px;
                        color: #f10215;
                        position: relative;
                        z-index: 1;
                        cursor: pointer;
                        margin-right: 3px;
                        &::before {
                            content: '';
                            display: block;
                            position: absolute;
                            bottom: 1px;
                            left: 1px;
                            width: 16px;
                            height: 16px;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, .85);
                            z-index: -1;
                        }
                    }
                }
            }
            >.portfolio {
                color: rgba(255, 255, 255, .85);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                >div {
                    font-size: 16px;
                    font-weight: 600;
                    user-select: none;
                    cursor: default;
                }
                >a {
                    color: rgba(255, 255, 255, .85);
                    font-size: 14px;
                    font-weight: 600;
                }
            }
        }
    }
</style>