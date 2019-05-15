import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './Avatar.less'

class Avatar extends React.Component {
    static propTypes = {
        username: PropTypes.string
    }

    state = {}

    render() {
        const { Item: MenuItem } = Menu
        const { username } = this.props
        const UserMenu = (
          <Menu>
            <MenuItem>
              <a href="#">个人中心</a>
            </MenuItem>
            <MenuItem>
              <a href="#">项目地址</a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem>
              <a href="#">退出登录</a>
            </MenuItem>
          </Menu>
        )

        return (
          <Dropdown overlay={UserMenu} placement="bottomCenter" trigger={[ 'click' ]}>
            <div className="avatar-component">
              <span className="avatar"></span>
              <span className="user-name">{username || '不写 bug 的米公子'}</span>
              <Icon type="caret-down" />
            </div>
          </Dropdown>
        )
    }
}

const mapStateToProps = state => {
    const { username } = state.userInfo

    return {
        username
    }
}

export default connect(mapStateToProps)(Avatar)
