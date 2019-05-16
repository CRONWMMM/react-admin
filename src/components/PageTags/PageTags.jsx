/* eslint-disable */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// actions
import { Row, Tag } from 'antd'
import { deletePageTab } from '../../store/action/pageTabsAction'
// components
import './PageTags.less'

class PageTags extends React.Component {
    static propTypes = {
        pageTabs: PropTypes.array.isRequired,
        deletePageTab: PropTypes.func.isRequired
    }

    /**
     * 处理 Tag 组件关闭回调
     * @params page {Object} 需要关闭的标签对象信息
     */
    handleTagClose = (page) => {
        const { pageTabs, deletePageTab } = this.props
        deletePageTab(page)
    }

    /**
     * 生成 Tags 组件列表
     */
    generatorTags = () => {
        const { pageTabs } = this.props
        const { length } = pageTabs

        return pageTabs.map((page, index) => {
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
    pageTabs: state.pageTabs
})

const mapDispatchToProps = dispatch => ({
    deletePageTab: (data) => dispatch(deletePageTab(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageTags)
