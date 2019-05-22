import React from 'react'
import { hot } from 'react-hot-loader/root'
import './Login.less'
// components
import LoginForm from './components/LoginForm/LoginForm'

class Login extends React.Component {
    render() {
        return (
          <div className="login-page">
            <LoginForm className="login-form trans-vertical-center" />
          </div>
        )
    }
}

export default hot(Login)
