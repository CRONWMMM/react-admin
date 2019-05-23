import asyncComponent from '../AsyncComponent'

const AsyncComponentsLoading = asyncComponent(() => import(/* webpackChunkName: "components_loading_page" */'views/Loading/Loading'))

export default [
    {
        path: '/components',
        name: 'components',
        children: [
            {
                path: '/components/loading',
                name: 'components-loading',
                meta: {
                    tag: 'loading 组件'
                },
                component: AsyncComponentsLoading
            }
        ]
    }
]
