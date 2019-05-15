import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "Home" */'../views/Home/Home'))
const AsyncUser = asyncComponent(() => import(/* webpackChunkName: "User" */'../views/User/User'))
const AsyncUserInfo = asyncComponent(() => import(/* webpackChunkName: "UserInfo" */'../views/User/subPages/Info/Info'))

const Routes = () => (
  <Switch>
    <Route exact path="/" key="/" component={AsyncHome} />
    <Switch>
      <Route exact path="/user" key="/user" component={AsyncUser} />
      <Route path="/user/:id" key="/userInfo" component={AsyncUserInfo} />
    </Switch>
  </Switch>
)

export default Routes
