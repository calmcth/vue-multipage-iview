import Vue from 'vue'
import iView from 'iview';
import router from './router';
import App from './app.vue';
import xfdUI from '../components/index';
Vue.use(iView);
Vue.use(xfdUI);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

