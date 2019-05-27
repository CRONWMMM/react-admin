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
import routes from 'router/routes'
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

        if (targetTag && tags.every(({ path }) => path !== pathname) && targetTag.name) tags = [...tags, targetTag]

        this.setState({ tags, changeLock: false })
    }

    /**
     * 处理 Tag 组件关闭回调
     * @params page {Object} 需要关闭的标签对象信息
     * @params index {Number} 当前标签对象在 tags 中的索引
     */
    handleTagClose = (page, index) => {
        const { history: $history, location: { pathname } } = this.props
        let { tags } = this.state
        tags = tags.filter((tag) => tag.name !== page.name)
        // 路径的获取顺序，先决条件分别为：
        // 1. 先找当前索引的路径
        // 2. 再找前一个索引的路径
        // 3. 其次找第一个索引的路径
        // 4. 都没有，则跳回首页
        let nextPathname = tags[index] ? tags[index].path : tags[index - 1] ? tags[index - 1].path : tags[0] ? tags[0].path : '/'
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
        return tags.map((tag, index) => {
            const { path, name, meta } = tag
            const closable = length > 1
            // 没有 meta 就返回 null
            if (!meta) return null
            return (
                <Tag
                    closable={closable}
                    key={name || path}
                    color={path === pathname ? '#108ee9' : null}
                    onClose={() => this.handleTagClose(tag, index)}>
                    {path && path !== pathname ? <Link to={path}>{meta.tag}</Link> : meta.tag}
                </Tag>
            )
        })
    }

    render() {
        return (
            <Row className="page-tags-component">
                {this.generatorTags()}
            </Row>
        )
    }
}

export default hot(withRouter(PageTags))
