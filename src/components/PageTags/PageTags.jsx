import React from 'react'
import { Row, Tag } from 'antd'
import './PageTags.less'

class PageTags extends React.Component {
    render() {
        return (
            <Row className="page-tags-component">
                <Tag closable color="#1890ff">首页</Tag>
                <Tag closable>个人中心</Tag>
                <Tag closable>测试页面</Tag>
            </Row>
        )
    }
}

export default PageTags
