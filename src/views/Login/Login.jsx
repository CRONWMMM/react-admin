import React from 'react'
import './Login.less'
// components
import LoginForm from './components/LoginForm/LoginForm'

class Login extends React.Component {
    render() {
        return (
          <div className="login">
            <LoginForm className="login-form trans-vertical-center" />
          </div>
        )
    }
}

export default Login
