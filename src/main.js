import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import Main from './views/Main/Main'
import './common/less/reset.less'
import './common/less/iconfont.less'

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

render(Main)

if (module.hot) {
    module.hot.accept('./views/Main/Main', () => {
        const { default: Main } = require('./views/Main/Main')
        render(Main)
    })
}
