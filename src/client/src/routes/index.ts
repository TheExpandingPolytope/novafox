import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../components/Main.vue';
import Room from '../components/Room.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';

Vue.use(VueRouter);

var router: VueRouter = new VueRouter({
    routes: [
        {
            path:'/',
            component: Main
        },
        {
            path:'/login',
            component: Login
        },
        {
            path:'/signup',
            component: Signup
        },
        {
            path:'/room/:id',
            component:Room,
        }
    ]
});

export default router;