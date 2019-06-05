import React from 'react'
import { hot } from 'react-hot-loader/root'
// pluggin
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
// components
import { Alert } from 'antd'
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
                name: '酒吧',
                src: pic1
            },
            {
                name: '花火',
                src: pic2
            },
            {
                name: '云海',
                src: pic3
            },
            {
                name: '海岛',
                src: pic4
            },
            {
                name: '猫头鹰',
                src: pic5
            },
            {
                name: '歪果仁',
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
            slidesPerView: 5,
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
            <div className="window-wrap">
              <div className="left-part">
                <Alert type="info"
                       showIcon
                       closable
                       message="图片查看器组件，使用鼠标滚轮进行图片缩放，使用鼠标进行图片拖拽。" />
                <PictureViewer ref={this.pictureViewerRef} className="picture-viewer" width="50vw" height="50vh" minimum={1}>
                  <img src={picSrc} alt="图片" draggable="false" />
                </PictureViewer>
              </div>
              <div className="right-part"></div>
            </div>
            <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
              <div className="swiper-wrapper">
                {imageList.map(({ src, name }) => (
                  <div className="swiper-slide" key={name}>
                    <img src={src} alt={name} />
                  </div>
                ))}
              </div>
              <i className="iconfont iconright swiper-button-next"></i>
              <i className="iconfont iconleft swiper-button-prev "></i>
            </div>
          </div>
        )
    }
}

export default hot(PicViewer)
