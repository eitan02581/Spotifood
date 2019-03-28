import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (timestamp) => {
    return moment(timestamp).fromNow();
})

Vue.filter('fullTime', timestamp => {
    return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
})

