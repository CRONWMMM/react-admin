import asyncComponent from '../AsyncComponent'

const AsyncNotFound = asyncComponent(() => import(/* webpackChunkName: "notfound_page" */'views/404/404'))

export default [
    {
        path: '/404',
        name: '404',
        component: AsyncNotFound
    }
]

