import React from 'react'
// components
import './StretchDelayLoading.less'

class StretchDelayLoading extends React.Component {
    render() {
        return (
          <div className="stretch-delay-loading">
            <span className="rect rect1"></span>
            <span className="rect rect2"></span>
            <span className="rect rect3"></span>
            <span className="rect rect4"></span>
            <span className="rect rect5"></span>
          </div>
        )
    }
}

export default StretchDelayLoading
