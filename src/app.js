import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from '../src/router'

const root = document.getElementById('root')
ReactDOM.render(
    <BrowserRouter>
        <Routes></Routes>
    </BrowserRouter>,
    root
)
