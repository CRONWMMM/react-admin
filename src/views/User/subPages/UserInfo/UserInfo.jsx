import React from 'react'
import { Typography, Descriptions, Divider, Icon } from 'antd'
import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// components
import AvatarFrame from '../../components/AvatarFrame/AvatarFrame'
// actions
import { updateUserInfo } from '../../../../store/action/userAction'
// style
import './UserInfo.less'

const { Paragraph } = Typography

class UserInfo extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        resetUserName: PropTypes.func.isRequired
    }

    onChange = str => {
        const { resetUserName } = this.props
        resetUserName(str)
    }

    render() {
        let { username } = this.props
        username = username || '不写 bug 的米公子'

        return (
          <div className="user-info-page">
            <div className="left-part">
              <AvatarFrame className="avatar-frame" type="rect" />
              <Icon type="github" />
            </div>
            <div className="right-part">
              <Descriptions title="个人信息" border>
                <Descriptions className="Item" label="用户名">
                  <Paragraph editable={{ onChange: this.onChange }} type="secondary">{username}</Paragraph>
                </Descriptions>
              </Descriptions>
              <Divider />
            </div>
          </div>
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
        resetUserName: (str) => dispatch(updateUserInfo({ username: str }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(hot(UserInfo))
