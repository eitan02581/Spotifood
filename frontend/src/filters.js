import Vue from 'vue'
import moment, { now } from 'moment'

Vue.filter('time', (timestamp) => {
    return moment(timestamp).fromNow();
})

Vue.filter('fullTime', timestamp => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
})

Vue.filter('commingUp', timestamp => {
    let nowDate = new Date().getTime()
    console.log(timestamp - nowDate)
    return moment(timestamp - nowDate).endOf('day').fromNow();
})