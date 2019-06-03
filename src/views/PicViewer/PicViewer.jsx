import React from 'react'
import { hot } from 'react-hot-loader/root'
// pluggin
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
// components
import PictureViewer from 'components/PictureViewer/PictureViewer'
// images
import pic1 from 'assets/images/pic1.jpg'
import pic2 from 'assets/images/pic2.jpg'
import pic3 from 'assets/images/pic3.jpg'
import pic4 from 'assets/images/pic4.jpg'
import pic5 from 'assets/images/pic5.jpg'
import pic6 from 'assets/images/pic6.jpg'
// images
import picture1 from '../../assets/images/banner.jpg'
// style
import './PicViewer.less'

class PicViewer extends React.Component {
    state = {
        imageList: [
            {
                name: '图片1',
                src: pic1
            },
            {
                name: '图片2',
                src: pic2
            },
            {
                name: '图片3',
                src: pic3
            },
            {
                name: '图片4',
                src: pic4
            },
            {
                name: '图片5',
                src: pic5
            },
            {
                name: '图片6',
                src: pic6
            },
        ]
    }

    componentDidMount() {
        // Swiper
        const bannerSwiper = new Swiper('.swiper-container', { // eslint-disable-line
            slidesPerView: 3,
            spaceBetween: 30,
            freeMode: true
        })
    }

    render() {
        const { imageList } = this.state

        return (
          <div className="picture-viewer-page">
            <PictureViewer className="picture-viewer" width="600" height="400">
              <img src={picture1} alt="图片" draggable="false" />
            </PictureViewer>
            <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
              <div className="swiper-wrapper">
                {imageList.map(({ src, name }) => (
                  <div className="swiper-slide" key={name}>
                    <img src={src} alt={name} />
                  </div>
                ))}
                {/*<div className="swiper-slide swiper-slide-active">Slide 1</div>*/}
                {/*<div className="swiper-slide swiper-slide-next">Slide 2</div>*/}
              </div>
            </div>
          </div>
        )
    }
}

export default hot(PicViewer)
