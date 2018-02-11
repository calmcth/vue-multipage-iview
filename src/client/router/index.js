import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
/**
 * 基础路由
 * @type {[null,null,null]}
 */
let routes=[
    {
        path: '/', name:'login',component: r => require.ensure([], () => r(require('../page/user.vue')), 'client/user')
    },{
        path: '/editUser', name:'editUser',component: r => require.ensure([], () => r(require('../page/editUser/editUser.vue')), 'client/editUser')
    },
];
const router = new VueRouter({
    //mode: 'history',
    routes: routes
});

export default router;