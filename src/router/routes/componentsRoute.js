import asyncComponent from '../AsyncComponent'

const AsyncComponentsLoading = asyncComponent(() => import(/* webpackChunkName: "components_loading_page" */'views/Loading/Loading'))
const AsyncPicViewersLoading = asyncComponent(() => import(/* webpackChunkName: "components_picviewer_page" */'views/PicViewer/PicViewer'))

export default [
    {
        path: '/components',
        name: 'components',
        meta: {
            tag: '组件',
            icon: 'apartment'
        },
        children: [
            {
                path: '/components/loading',
                name: 'components-loading',
                meta: {
                    tag: 'loading 组件'
                },
                component: AsyncComponentsLoading
            },
            {
                path: '/components/picviewer',
                name: 'components-picviewer',
                meta: {
                    tag: '图片查看器组件'
                },
                component: AsyncPicViewersLoading
            }
        ]
    }
]
