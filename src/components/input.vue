<template>
    <div class="sun-input">
        <x-icon v-if="icon" :name="icon" class="icon" :class="{focus:focus||value}"></x-icon>
        <input :type="type" @focus="onFocus" @blur="onBlur" :value="value" @input="onInput" @change="onChange" :class="{['no-icon']:!icon}">
        <label v-if="placeholder" :class="{focus:focus||value,['no-icon']:!icon}">{{placeholder}}</label>
    </div>
</template>
<script>
    import xIcon from './icon/icon.vue'
    export default {
        name: 'sunInput',
        components: { xIcon },
        props: {
            placeholder: String,
            value: String,
            icon: String,
            type: { type: String, default: 'text' }
        },
        data() {
            return { focus: false }
        },
        methods: {
            onFocus(e) {
                this.focus = true
                this.$emit('focus', e)
            },
            onBlur(e) {
                this.focus = false
                this.$emit('blur', e)
            },
            onInput(e) {
                this.$emit('input', e.target.value)
            },
            onChange(e) {
                this.$emit('change', e)
            }
        }
    }
</script>
<style scoped lang="scss">
    .sun-input {
        width: 100%;
        height: 32px;
        position: relative;
        color: rgba(0, 0, 0, .65);
        >.icon {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            color: rgba(0, 0, 0, .45);
            &.focus {
                color: rgba(0, 0, 0, .65);
            }
        }
        >input {
            width: 100%;
            height: 100%;
            display: block;
            border: 1px solid rgba(0, 0, 0, .15);
            border-radius: 2px;
            box-shadow: none;
            padding: 0 5px 0 30px;
            &.no-icon {
                padding: 0 5px;
            }
            &:focus {
                outline: none;
            }
        }
        >label {
            display: block;
            position: absolute;
            top: 50%;
            left: 30px;
            transform: translateY(-50%);
            color: rgba(0, 0, 0, .45);
            pointer-events: none;
            &.focus {
                display: none;
            }
            &.no-icon {
              left: 5px;
            }
        }
    }
</style>