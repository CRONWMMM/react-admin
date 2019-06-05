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
// style
import './PicViewer.less'

class PicViewer extends React.Component {
    state = {
        activeIndex: 0,
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

    constructor() {
        super()
        this.pictureViewerRef = React.createRef()
    }

    componentDidMount() {
        const self = this
        const { activeIndex } = self.state

        // Swiper
        const picSwiper = new Swiper('.swiper-container', { // eslint-disable-line
            slidesPerView: 6,
            spaceBetween: 30,
            // 使用 initialSlider 配合 centeredSlides 属性实现
            initialSlide: activeIndex,
            centeredSlides : true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // freeMode: true
            on: {
                click: function(event) {
                    console.log(event)
                },
                slideChange: function() {
                    const { activeIndex } = picSwiper
                    self.setState({
                        activeIndex
                    })
                }
            }
        })
    }

    render() {
        const { imageList, activeIndex } = this.state
        const { src: picSrc } = imageList[activeIndex]

        return (
          <div className="picture-viewer-page">
            <PictureViewer ref={this.pictureViewerRef} className="picture-viewer" width="50vw" height="50vh" minimum={1}>
              <img src={picSrc} alt="图片" draggable="false" />
            </PictureViewer>
            <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
              <div className="swiper-wrapper">
                {imageList.map(({ src, name }) => (
                  <div className="swiper-slide" key={name}>
                    <img src={src} alt={name} />
                  </div>
                ))}
              </div>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
          </div>
        )
    }
}

export default hot(PicViewer)
