import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "home_page" */'../views/Home/Home'))
const AsyncUser = asyncComponent(() => import(/* webpackChunkName: "user_page" */'../views/User/User'))
const AsyncComponentsLoading = asyncComponent(() => import(/* webpackChunkName: "components_loading_page" */'../views/Components/subPages/Loading/Loading'))

const Routes = () => (
  <Switch>
    <Route exact path="/" key="/" component={AsyncHome} />
    <Route path="/user" key="/user" component={AsyncUser} />
    <Route exact path="/components" key="/components" render={() => (<Redirect to="/components/loading" />)} />
    <Route exact path="/components/loading" key="/components/loading" component={AsyncComponentsLoading} />
  </Switch>
)

export default Routes
