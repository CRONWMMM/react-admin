import React from 'react'
import { hot } from 'react-hot-loader/root'
// pluggin
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
// components
import PictureViewer from 'components/PictureViewer/PictureViewer'
// images
import picture1 from '../../assets/images/banner.jpg'
// style
import './PicViewer.less'

class PicViewer extends React.Component {
    componentDidMount() {
        // Swiper
        const bannerSwiper = new Swiper('.swiper-container', { // eslint-disable-line
            slidesPerView: 3,
            spaceBetween: 30,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        })
    }

    render() {
        return (
          <div className="picture-viewer-page">
            <PictureViewer width="600" height="400">
              <img src={picture1} alt="图片" draggable="false" />
            </PictureViewer>
            <div className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
              <div className="swiper-wrapper">
                <div className="swiper-slide swiper-slide-active" style={{width: '620px', marginRight: '30px'}}>Slide 1</div>
                <div className="swiper-slide swiper-slide-next" style={{width: '620px', marginRight: '30px'}}>Slide 2</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 3</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 4</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 5</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 6</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 7</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 8</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 9</div>
                <div className="swiper-slide" style={{width: '620px', marginRight: '30px'}}>Slide 10</div>
              </div>
            </div>
          </div>
        )
    }
}

export default hot(PicViewer)
