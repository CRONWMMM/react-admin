import React from 'react'
// styles
import './BounceLoading.less'
import PropTypes from 'prop-types';

class BounceLoading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }

    render() {
        const { className } = this.props

        return (
          <div className={`bounce-loading ${className}`}>
            <div className="double-bounce1 rect"></div>
            <div className="double-bounce2 rect"></div>
          </div>
        )
    }
}

export default BounceLoading
