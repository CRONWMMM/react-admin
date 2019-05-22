import React from 'react'
import { hot } from 'react-hot-loader/root'
// components
import { Button, Icon } from 'antd'
// router
import { Link } from 'react-router-dom'
// style
import './404.less'

class NotFound extends React.Component {
    render() {
        return (
          <div className="not-found-page">
            <div className="not-found">
              <i className="iconfont icon404"></i>
              <div className="tips">页面走丢了~</div>
              <div className="btn-group">
                <Button className="btn" type="primary"><Link to="/"><Icon className="btn-icon" type="home" /> 返回首页</Link></Button>
                <Button className="btn" type="secondary"><Icon className="btn-icon" type="customer-service" />去听首歌</Button>
              </div>
            </div>
          </div>
        )
    }
}

export default hot(NotFound)
