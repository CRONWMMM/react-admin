import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Tag } from 'antd'
import './PageTags.less'

class PageTags extends React.Component {
    render() {
        return (
          <Row className="page-tags-component">
            <Tag color="#1890ff"><Link to="/">首页</Link></Tag>
            <Tag closable><Link to="/user">个人中心</Link></Tag>
            <Tag closable>测试页面</Tag>
          </Row>
        )
    }
}

export default PageTags
