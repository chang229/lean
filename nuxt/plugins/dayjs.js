import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('dateFormat',(value,format = 'YYYY-MM-DD hh:mm:ss') => {
    return dayjs(value).format(format)
})