import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Rollcall from '@/pages/Rollcall'
import Homework from '@/pages/Homework'
import Project from '@/pages/Project'
import Examination from '@/pages/Examination'
import Settings from '@/pages/Settings'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

Vue.use(Router)

let router = new Router({
    routes: [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta:{
            requireAuth:true
        }
    },
    {
        path: '/rollcall',
        name: 'Rollcall',
        component: Rollcall,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/homework',
        name: 'Homework',
        component: Homework,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/project',
        name: 'Project',
        component: Project,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/examination',
        name: 'Examination',
        component: Examination,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {console.log('router beforeEach')
    // if(to.matched.some(record=>record.meta.requireAuth)){
    if (to.meta.requireAuth) {
        // let currentUser = router.app.$store.state;//为什么第一次在次无法获取到$store??
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let Authorization = currentUser && currentUser.Authorization
        
        // 判断是否登录
        if (Authorization) {
            // 验证token是否过期
            // router.app.$store.dispatch('tokenVerify',Authorization);
            next();
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next();
    }
});

export default router;
