import React from 'react'
// components
import './StretchDelayLoading.less'
import PropTypes from 'prop-types';

class StretchDelayLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`stretch-delay-loading ${className}`}>
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
