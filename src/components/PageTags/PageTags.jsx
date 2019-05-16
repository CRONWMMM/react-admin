/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// actions
import { Row, Tag } from 'antd'
import { addPageTag, deletePageTag } from '../../store/action/pageTagsAction'
// components
import './PageTags.less'

class PageTags extends React.Component {
    static propTypes = {
        pageTags: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        deletePageTag: PropTypes.func.isRequired
    }

    componentWillMount() {
        const {  history: $history } = this.props
        $history.listen(this.updatePageTags)
    }

    componentDidMount() {
        this.updatePageTags()
    }

    updatePageTags = () => {
        const { location: { pathname }, addPageTag, pageTags } = this.props

        let tagInfo = { path: pathname, key: pathname }
        switch (pathname) {
            case '/user':
                tagInfo.name = '用户主页'
                break
            case '/user/info':
                tagInfo.name = '用户信息'
                break
        }
        tagInfo.name && pageTags.every(({ path }) => path !== pathname) && addPageTag(tagInfo)
    }

    /**
     * 处理 Tag 组件关闭回调
     * @params page {Object} 需要关闭的标签对象信息
     */
    handleTagClose = (page) => {
        const { deletePageTag } = this.props
        deletePageTag(page)
    }

    /**
     * 生成 Tags 组件列表
     */
    generatorTags = () => {
        const { pageTags } = this.props
        const { length } = pageTags

        return pageTags.map((page, index) => {
            const closable = length > 1
            return (
                <Tag closable={closable} key={index} onClose={() => this.handleTagClose(page, index)}>
                    {page.path ? <Link to={page.path}>{page.name}</Link> : page.name}
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

const mapStateToProps = state => ({
    pageTags: state.pageTags
})

const mapDispatchToProps = dispatch => ({
    deletePageTag: (data) => dispatch(deletePageTag(data)),
    addPageTag: (data) => dispatch(addPageTag(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageTags))
