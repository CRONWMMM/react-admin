import React from 'react'
import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
// views
import PropTypes from "prop-types";
import Login from '../Login/Login'
import App from '../App/App'

class Main extends React.Component {
    static propTypes = {
        isLogin: PropTypes.bool
    }

    render () {
        // const { isLogin } = this.props
        const isLogin = true

        if (isLogin) {
            return (<App />)
        } else {
            return (<Login />)
        }
    }
}


const mapStateToProps = (state) => {
    const { username } = state.userInfo
    return {
        isLogin: !!username
    }
}

export default connect(mapStateToProps)(hot(Main))
