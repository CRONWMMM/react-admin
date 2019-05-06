import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import Routes from '../src/router'

const root = document.getElementById('root')
ReactDOM.render(
    <HashRouter>
        <Routes></Routes>
    </HashRouter>,
    root
)
