import React from 'react'
// styles
import './BounceRotateLoading.less'
import PropTypes from 'prop-types';

class BounceRotateLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`bounce-rotate-loading ${className}`}>
            <div className="dot1 rect"></div>
            <div className="dot2 rect"></div>
          </div>
        )
    }
}

export default BounceRotateLoading
