import React from 'react'
import { connect } from 'react-redux'
import './Login.less'
// action
import { loginAction } from '../../store/action/action'
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
        isLogin: state.loginState === 1 ? true : false
    }
}
const mapDispatchToProps = { loginAction }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
