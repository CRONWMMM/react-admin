import React from 'react'
import { hot } from 'react-hot-loader/root'
// components
import PictureViewer from 'components/PictureViewer/PictureViewer'
// images
import picture1 from '../../assets/images/banner.jpg'
// style
import './PicViewer.less'

class PicViewer extends React.Component {

    render() {
        return (
          <div className="picture-viewer-page">
            <PictureViewer width="800" height="600">
              <img src={picture1}
                   alt="图片"
                   draggable="false" />
            </PictureViewer>
          </div>
        )
    }
}

export default hot(PicViewer)
