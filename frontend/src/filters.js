import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (timestamp) => {
    return moment(timestamp).fromNow();
})



