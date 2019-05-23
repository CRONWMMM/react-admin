import React from 'react'
import { hot } from 'react-hot-loader/root'
// components
import StretchDelayLoading from 'components/loadings/StretchDelayLoading/StretchDelayLoading'
import RotatePlaneLoading from 'components/loadings/RotatePlaneLoading/RotatePlaneLoading'
import BounceLoading from 'components/loadings/BounceLoading/BounceLoading'
import CubeMoveLoading from 'components/loadings/CubeMoveLoading/CubeMoveLoading'
import BounceRotateLoading from 'components/loadings/BounceRotateLoading/BounceRotateLoading'
import BounceDelayLoading from 'components/loadings/BounceDelayLoading/BounceDelayLoading'
import ScaleOutLoading from 'components/loadings/ScaleOutLoading/ScaleOutLoading'
import CirclesBounceLoading from 'components/loadings/CirclesBounceLoading/CirclesBounceLoading'
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
            },
            {
                name: 'BounceLoading Component',
                component: BounceLoading
            },
            {
                name: 'CubeMoveLoading Component',
                component: CubeMoveLoading
            },
            {
                name: 'BounceRotateLoading Component',
                component: BounceRotateLoading
            },
            {
                name: 'BounceDelayLoading Component',
                component: BounceDelayLoading
            },
            {
                name: 'ScaleOutLoading Component',
                component: ScaleOutLoading
            },
            {
                name: 'CirclesBounceLoading Component',
                component: CirclesBounceLoading
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

export default hot(Loading)
