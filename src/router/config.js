import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "home_page" */'views/Home/Home'))
const AsyncUser = asyncComponent(() => import(/* webpackChunkName: "user_page" */'views/User/User'))
const AsyncUserInfo = asyncComponent(() => import(/* webpackChunkName: "user_info_page" */'views/User/subPages/UserInfo/UserInfo'))
const AsyncComponentsLoading = asyncComponent(() => import(/* webpackChunkName: "components_loading_page" */'views/Components/subPages/Loading/Loading'))


export default [
    {
        path: '/',
        exact: true,
        component: AsyncHome
    },
    {
        path: '/home',
        name: 'home',
        component: AsyncHome
    },
    {
        path: '/user',
        name: 'user',
        component: AsyncUser,
        children: [
            {
                path: 'info',
                name: 'user-info',
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
        component: AsyncComponentsLoading
    }
]
