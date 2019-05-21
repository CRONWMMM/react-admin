import React from 'react'
// components
import StretchDelayLoading from 'components/loadings/StretchDelayLoading/StretchDelayLoading'
// styles
import './Loading.less'

class Loading extends React.Component {
    render() {
        return (
          <div className="loading-page">
            <StretchDelayLoading />
          </div>
        )
    }
}

export default Loading
