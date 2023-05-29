import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserHome from '@/components/UserHome'

Vue.use(Router)

export default new Router({
/*eslint-disable*/
    //如果是根路径，使用的是heloworld组件
    //如果使用的是/user，使用的是userhome这个组件
    routes: [{
                path: '/',
                name: 'HelloWorld',
                component: HelloWorld
            },
            {
                path: '/user',
                name: 'UserHome',
                component: UserHome
            }
        ]
        /* eslint-disable */
})
