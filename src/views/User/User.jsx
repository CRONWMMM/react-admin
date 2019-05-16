import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import asyncComponent from '../../router/AsyncComponent'
import './User.less'

const AsyncUserInfo = asyncComponent(() => import(/* webpackChunkName: "UserInfo" */'./subPages/UserInfo/UserInfo'))

class User extends React.Component {
    static propTypes = {
        match: PropTypes.object
    }

    render() {
        return (
          <div className="user-page">
                This is User Page.
            <Route path="/user/:id" key="/userInfo" component={AsyncUserInfo} />
          </div>
        )
    }
}

export default User
