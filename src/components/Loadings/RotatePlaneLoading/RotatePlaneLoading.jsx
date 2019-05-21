import React from 'react'
import PropTypes from 'prop-types'
// styles
import './RotatePlaneLoading.less'

class RotatePlaneLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`rotate-plane-loading rect ${className}`}></div>
        )
    }
}

export default RotatePlaneLoading
