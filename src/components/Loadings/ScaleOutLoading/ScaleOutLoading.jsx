import React from 'react'
import PropTypes from 'prop-types'
// styles
import './ScaleOutLoading.less'

class ScaleOutLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`scale-out-loading rect ${className}`}></div>
        )
    }
}

export default ScaleOutLoading
