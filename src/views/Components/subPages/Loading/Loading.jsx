import React from 'react'
// components
import StretchDelayLoading from 'components/loadings/StretchDelayLoading/StretchDelayLoading'
import RotatePlaneLoading from 'components/loadings/RotatePlaneLoading/RotatePlaneLoading'
// styles
import './Loading.less'

class Loading extends React.Component {
    state = {
        loadingComponents: [
            {
                name: 'StretchDelayLoading Component',
                component: StretchDelayLoading
            },
            {
                name: 'RotatePlaneLoading Component',
                component: RotatePlaneLoading
            }
        ]
    }

    render() {
        const { loadingComponents } = this.state

        return (
          <div className="loading-page">
            <ul className="loading-show">
              {
                  loadingComponents.map((item) => {
                      const LoadingComponent = item.component
                      return (
                        <li key={item.name} className="item">
                          <div className="icon-wrap"><LoadingComponent /></div>
                          <span className="name">{item.name}</span>
                        </li>
                      )
                  })
              }
            </ul>
          </div>
        )
    }
}

export default Loading
