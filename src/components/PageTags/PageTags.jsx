/* eslint-disable */
import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// actions
import { Row, Tag } from 'antd'
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
        tags: [
            {
                name: '首页',
                key: '/home',
                path: '/'
            }
        ]
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
        const { location: { pathname } } = this.props
        let { changeLock, tags } = this.state
        let tagInfo = { path: pathname, key: pathname }

        if (changeLock) return

        switch (pathname) {
            case '/':
                tagInfo.name = '首页'
                break
            case '/user':
                tagInfo.name = '用户主页'
                break
            case '/user/info':
                tagInfo.name = '用户信息'
                break
        }
        if (tagInfo.name && tags.every(({ path }) => path !== pathname)) {
            tags = [...tags, tagInfo]
        }
        this.setState({ tags, changeLock: false })
    }

    /**
     * 处理 Tag 组件关闭回调
     * @params page {Object} 需要关闭的标签对象信息
     */
    handleTagClose = (page) => {
        const { history: $history, location: { pathname } } = this.props
        let { tags } = this.state
        tags = tags.filter((tag) => tag.key !== page.key)
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
            const closable = length > 1
            return (
                <Tag
                    closable={closable}
                    key={page.key}
                    color={page.path === pathname ? '#108ee9' : null}
                    onClose={() => this.handleTagClose(page)}>
                    {page.path && page.path !== pathname ? <Link to={page.path}>{page.name}</Link> : page.name}
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

export default withRouter(PageTags)
