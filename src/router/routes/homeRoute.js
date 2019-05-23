import asyncComponent from '../AsyncComponent'

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "home_page" */'views/Home/Home'))

export default [
    {
        path: '/',
        exact: true,
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            tag: '首页'
        },
        component: AsyncHome
    }
]
