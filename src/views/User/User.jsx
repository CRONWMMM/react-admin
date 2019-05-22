import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import routes from 'router/config'
import './User.less'

class User extends React.Component {
    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const rootRoute = routes.find(route => route.name === 'user') || {}
        const userSubRoutes = rootRoute.children || []

        return (
          <div className="user-page">
                This is User Page.
            {
                  userSubRoutes.map(route => {
                      const { exact, path, name, redirect, component } = route
                      if (!redirect) {
                          return (
                            <Route exact={exact ? true : false}
                                   path={path}
                                   key={name || path}
                                   component={component} />
                          )
                      } else {
                          return (
                            <Route exact={exact ? true : false}
                                   path={path}
                                   key={name || path}
                                   render={() => (<Redirect to={redirect} />)} />
                          )
                      }
                  })
              }
          </div>
        )
    }
}

export default hot(User)
