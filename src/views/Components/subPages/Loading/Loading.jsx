import React from 'react'
// components
import StretchDelayLoading from 'components/loadings/StretchDelayLoading/StretchDelayLoading'
// styles
import './Loading.less'

class Loading extends React.Component {
    render() {
        return (
          <div className="loading-page">
            <ul className="loading-show">
              <li className="item">
                <StretchDelayLoading />
                <span>StretchDelayLoading Component</span>
              </li>
            </ul>
          </div>
        )
    }
}

export default Loading
