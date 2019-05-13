import React from 'react'
// views
import Login from '../Login/Login'
import App from '../App/App'

class Main extends React.Component {
    render () {
        const IS_LOGIN = true
        if (IS_LOGIN) {
            return (<App />)
        } else {
            return (<Login />)
        }
    }
}

export default Main
