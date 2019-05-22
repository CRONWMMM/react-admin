import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "home_page" */'views/Home/Home'))
const AsyncUser = asyncComponent(() => import(/* webpackChunkName: "user_page" */'views/User/User'))
const AsyncUserInfo = asyncComponent(() => import(/* webpackChunkName: "user_info_page" */'views/User/subPages/UserInfo/UserInfo'))
const AsyncComponentsLoading = asyncComponent(() => import(/* webpackChunkName: "components_loading_page" */'views/Components/subPages/Loading/Loading'))


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
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            tag: '用户'
        },
        component: AsyncUser,
        children: [
            {
                path: '/user/info',
                name: 'user-info',
                meta: {
                    tag: '用户信息'
                },
                component: AsyncUserInfo
            }
        ]
    },
    {
        path: '/components',
        name: 'components',
        exact: true,
        redirect: '/components/loading'
    },
    {
        path: '/components/loading',
        name: 'component-loading',
        meta: {
            tag: 'loading 组件'
        },
        component: AsyncComponentsLoading
    }
]
