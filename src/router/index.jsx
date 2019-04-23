import React from 'react'
import { Route } from 'react-router-dom'
import Home from 'views/Home'

export default () => [
    <Route path="/" key="/" component={Home} exact />
]


