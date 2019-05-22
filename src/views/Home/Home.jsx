import React from 'react'
import { hot } from 'react-hot-loader/root'
import './Home.less'

class Home extends React.Component {
    state = {}

    render () {
        return (
          <div className="home-page">
                This is Home Page.
          </div>
        )
    }
}

export default hot(Home)
