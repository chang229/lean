import Button from '../index';

export default {
    title:'Button',
    component:Button
}

export const MyButton = () => ({
    component:{ Button },
    template: '<Button>{{ value }}</Button>',
    data () {
        return {
            value: 'admin'
        }
    }
})