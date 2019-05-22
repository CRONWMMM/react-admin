import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// actions
import { updateUserInfo } from '../../store/action/userAction'
import './Avatar.less'

class Avatar extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        logoffUserInfo: PropTypes.func.isRequired
    }

    state = {}

    logout = e => {
        const { logoffUserInfo } = this.props
        e.preventDefault()
        logoffUserInfo()
    }

    render() {
        const { Item: MenuItem } = Menu
        const { username } = this.props
        const UserMenu = (
          <Menu>
            <MenuItem>
              <Link to="/user">个人中心</Link>
            </MenuItem>
            <MenuItem>
              <a href="#">项目地址</a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem>
              <a href="#" onClick={this.logout}>退出登录</a>
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

const mapDispatchToProps = dispatch => {
    return {
        logoffUserInfo: () => dispatch(updateUserInfo({ username: '', password: '' }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(Avatar))
