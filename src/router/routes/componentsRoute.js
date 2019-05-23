import asyncComponent from '../AsyncComponent'

const AsyncComponentsLoading = asyncComponent(() => import(/* webpackChunkName: "components_loading_page" */'views/Components/subPages/Loading/Loading'))

export default [
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
