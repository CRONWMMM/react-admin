import React from 'react'
import { connect } from 'react-redux'
import './Login.less'
// action
import { updateUserInfo } from '../../store/action/userAction'
// components
import LoginForm from './components/LoginForm/LoginForm'

class Login extends React.Component {
    render() {
        return (
          <div className="login">
            <LoginForm className="trans-center" />
          </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        userInfo: state.userInfo
    }
}
const mapDispatchToProps = { updateUserInfo }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
