import Button from './src/button.vue';

Button.install = (vue) => {
    vue.component(Button.name,Button)
}

export default Button