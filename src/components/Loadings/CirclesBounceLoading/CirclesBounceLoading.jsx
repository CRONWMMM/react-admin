import React from 'react'
import PropTypes from 'prop-types'
// styles
import './CirclesBounceLoading.less'

class CirclesBounceLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`circles-bounce-loading ${className}`}>
            <div className="loading-container container1">
              <div className="circle circle1 rect"></div>
              <div className="circle circle2 rect"></div>
              <div className="circle circle3 rect"></div>
              <div className="circle circle4 rect"></div>
            </div>

            <div className="loading-container container2">
              <div className="circle circle1 rect"></div>
              <div className="circle circle2 rect"></div>
              <div className="circle circle3 rect"></div>
              <div className="circle circle4 rect"></div>
            </div>

            <div className="loading-container container3">
              <div className="circle circle1 rect"></div>
              <div className="circle circle2 rect"></div>
              <div className="circle circle3 rect"></div>
              <div className="circle circle4 rect"></div>
            </div>
          </div>
        )
    }
}

export default CirclesBounceLoading
