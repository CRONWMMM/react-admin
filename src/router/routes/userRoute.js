import asyncComponent from '../AsyncComponent'

const AsyncUser = asyncComponent(() => import(/* webpackChunkName: "user_page" */'views/User/User'))
const AsyncUserInfo = asyncComponent(() => import(/* webpackChunkName: "user_info_page" */'views/User/subPages/UserInfo/UserInfo'))

export default [
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
    }
]
