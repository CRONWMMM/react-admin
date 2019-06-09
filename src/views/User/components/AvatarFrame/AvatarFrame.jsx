import React from 'react'
import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// utils
import { isNaN } from 'libs/utils'
// style
import './AvatarFrame.less'

class AvatarFrame extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        avatar: PropTypes.string,
        type: PropTypes.string,
        size: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    }

    static defaultProps = {
        type: 'rect', // 'rect' or 'circle'
        size: 240
    }

    render() {
        let { avatar, size, type } = this.props
        size = isNaN(+size) ? size : `${size}px`
        const style = {
            width: size,
            height: size
        }
        avatar = avatar || require('../../../../assets/images/avatar.jpg')

        return (
          <div className={`avatar-frame-component ${type}`} style={style}>
            <img src={avatar} alt="avatar" draggable={false} />
            <span className="btn">更换头像</span>
          </div>
        )
    }
}

const mapStateToProps = state => {
    const { username, avatar } = state.userInfo
    return {
        username,
        avatar
    }
}

export default connect(mapStateToProps)(hot(AvatarFrame))
