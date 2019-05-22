import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// utils
// import { isObject } from 'libs/utils'
// router config
import routes from './config'

const Routes = () => (
  <Switch>
    {
        routes.map(route => {
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
        }).concat([ <Redirect key="404" to="/404" /> ])
    }
  </Switch>
)

export default Routes
