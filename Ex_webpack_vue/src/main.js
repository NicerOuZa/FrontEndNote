import Vue from 'vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import App from './App.vue'



Vue.use(MintUI)
Vue.use(iView)

var vm = new Vue({
    el: '#app',
    render(h) {
        return h(App)
    },
})

