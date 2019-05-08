import React from 'react'
import { Route } from 'react-router-dom'
import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import(/* webpackChunkName: "Home" */'../views/Home/Home'))
const AsyncUser = asyncComponent(() => import(/* webpackChunkName: "User" */'../views/User/User'))

export default () => [
    <Route path="/" key="/" component={AsyncHome} exact />,
    <Route path="/user" key="/user" component={AsyncUser} />
]


