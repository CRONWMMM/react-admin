import React from 'react'
import { Route } from 'react-router-dom'
import asyncComponent from './AsyncComponent'

const AsyncHome = asyncComponent(() => import('../views/Home/Home'))
const AsyncUser = asyncComponent(() => import('../views/User/User'))

export default () => [
    <Route path="/" key="/" component={AsyncHome} exact />,
    <Route path="/user" key="/user" component={AsyncUser} />
]


