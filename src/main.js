import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from './views/app'
import './common/less/reset.less'

const root = document.getElementById('root')

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <HashRouter>
                <Component />
            </HashRouter>
        </AppContainer>,
        root
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./views/app', function(){
        const NewApp = require('./views/app').default
        render(NewApp)
    })
}
