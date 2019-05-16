import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "Home" */'../views/Home/Home'))
const AsyncUser = asyncComponent(() => import(/* webpackChunkName: "User" */'../views/User/User'))

const Routes = () => (
  <Switch>
    <Route exact path="/" key="/" component={AsyncHome} />
    <Route path="/user" key="/user" component={AsyncUser} />
  </Switch>
)

export default Routes
