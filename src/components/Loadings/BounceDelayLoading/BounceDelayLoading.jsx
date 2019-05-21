import React from 'react'
// styles
import './BounceDelayLoading.less'
import PropTypes from 'prop-types';

class BounceDelayLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`bounce-delay-loading ${className}`}>
            <div className="bounce1 rect"></div>
            <div className="bounce2 rect"></div>
            <div className="bounce3 rect"></div>
          </div>
        )
    }
}

export default BounceDelayLoading
