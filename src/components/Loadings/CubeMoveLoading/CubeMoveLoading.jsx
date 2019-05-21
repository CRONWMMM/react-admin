import React from 'react'
import PropTypes from 'prop-types'
// styles
import './CubeMoveLoading.less'

class CubeMoveLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`cube-move-loading ${className}`}>
            <div className="rect cube1"></div>
            <div className="rect cube2"></div>
          </div>
        )
    }
}

export default CubeMoveLoading
