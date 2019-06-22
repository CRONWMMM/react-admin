import React from 'react'
import { Typography, Descriptions, Divider } from 'antd'
import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// components
import AvatarFrame from '../../components/AvatarFrame/AvatarFrame'
import CalendarMap from '../../components/CalendarMap/CalendarMap'
// import EditableField from '../../components/EditableField/EditableField'
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

    state = {
        github: 'https://github.com/CRONWMMM',
        wechat: 'mty770224024'
    }

    onChange = str => {
        const { resetUserName } = this.props
        resetUserName(str)
    }

    handleChange = (stateKey, value) => {
        this.setState({
            'stateKey': value
        })
    }

    render() {
        // const { github, wechat } = this.state
        let { username } = this.props
        username = username || '不写 bug 的米公子'

        return (
          <div className="user-info-page">
            <div className="page-header">

            </div>
            <div className="page-content">
              <div className="left-part">
                <AvatarFrame className="avatar-frame" type="rect" size={180} />
                {/*<EditableField icon="github" onChange={val => this.handleChange('github', val)}>{github}</EditableField>*/}
                {/*<EditableField icon="wechat" onChange={val => this.handleChange('wechat', val)}>{wechat}</EditableField>*/}
              </div>
              <div className="right-part">
                <Descriptions title="个人信息" border>
                  <Descriptions className="Item" label="用户名">
                    <Paragraph editable={{ onChange: this.onChange }} type="secondary">{username}</Paragraph>
                  </Descriptions>
                </Descriptions>
                <Divider orientation="left">最近一年有 17788 次提交记录</Divider>
                <CalendarMap />
              </div>
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
