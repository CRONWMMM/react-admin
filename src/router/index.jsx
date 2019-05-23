import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// utils
// import { isObject } from 'libs/utils'
// router config
import routes from 'router/routes'

class Routes extends React.Component {
  _generatorRoutes(routes) {
    let result = []

    for (let i = 0, len = routes.length; i < len; i++) {
      const { exact, path, name, redirect, component, children } = routes[i]
      // 如果这个路由有子路由，但是没有自己的 component 就继续遍历它的下级路由，最后返回下级路由数组，拼接成同级组件
      if (children && !component) {
        result = [...result, ...this._generatorRoutes(children)]
      } else if (!redirect) {
        result.push(<Route exact={exact ? true : false} path={path} key={name || path} component={component} />)
      } else {
        result.push(<Route exact={exact ? true : false} path={path} key={name || path} render={() => (<Redirect to={redirect} />)} />)
      }
    }

    return result
  }

  render() {
    return (
      <Switch>
        {this._generatorRoutes(routes).concat([ <Redirect key="404" to="/404" /> ])}
      </Switch>
    )
  }
}

export default Routes
