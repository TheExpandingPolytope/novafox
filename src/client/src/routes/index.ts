import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '../components/Main.vue';
import Room from '../components/Room.vue';

Vue.use(VueRouter);

var router: VueRouter = new VueRouter({
    routes: [
        {
            path:'/',
            component: Main
        },
        {
            path:'/about',
        },
        {
            path:'/room/:id',
            component:Room,
        }
    ]
});

export default router;