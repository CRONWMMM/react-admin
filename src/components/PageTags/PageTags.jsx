/* eslint-disable */
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// actions
import { Row, Tag } from 'antd'
// utils
import { findDeeply } from 'libs/utils'
// routes config
import routes from 'router/config'
// components
import './PageTags.less'

class PageTags extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    state = {
        changeLock: false, // 线程锁
        tags: []
    }

    componentWillMount() {
        const { history: $history } = this.props
        $history.listen(() => {
            setTimeout(this.updateTags, 0)
        })
    }

    componentDidMount() {
        this.updateTags()
    }

    updateTags = () => {
        let { changeLock, tags } = this.state
        if (changeLock) return
        const { location: { pathname } } = this.props
        const targetTag = findDeeply(routes, route => route.path === pathname)

        if (targetTag && tags.every(({ path }) => path !== pathname)) tags = [...tags, targetTag]

        this.setState({ tags, changeLock: false })
    }

    /**
     * 处理 Tag 组件关闭回调
     * @params page {Object} 需要关闭的标签对象信息
     */
    handleTagClose = (page) => {
        const { history: $history, location: { pathname } } = this.props
        let { tags } = this.state
        tags = tags.filter((tag) => tag.name !== page.name)
        let nextPathname = tags[tags.length - 1].path || '/'
        this.setState({ tags })
        if (page.path === pathname && nextPathname !== pathname) $history.push(nextPathname)
    }

    /**
     * 生成 Tags 组件列表
     */
    generatorTags = () => {
        const { location: { pathname } } = this.props
        const { tags } = this.state
        const { length } = tags
        return tags.map((page) => {
            const { path, name, meta } = page
            const closable = length > 1
            // 没有 meta 就返回 null
            if (!meta) return null
            return (
                <Tag
                    closable={closable}
                    key={name || path}
                    color={path === pathname ? '#108ee9' : null}
                    onClose={() => this.handleTagClose(page)}>
                    {path && path !== pathname ? <Link to={path}>{meta.tag}</Link> : meta.tag}
                </Tag>
            )
        })
    }

    render() {
        return (
            <Row className="page-tags-component">
                {this.generatorTags()}
                {/*<Tag color="#1890ff"><Link to="/">首页</Link></Tag>*/}
                {/*<Tag closable><Link to="/user">个人中心</Link></Tag>*/}
                {/*<Tag closable>测试页面</Tag>*/}
            </Row>
        )
    }
}

export default hot(withRouter(PageTags))
