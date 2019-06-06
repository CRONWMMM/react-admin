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
        activeIndex: 3,
        imageList: [
            {
                name: '酒吧',
                desc: '有人说苦难会让人变得高风亮节，其实不然，有时幸福的生活才会让人的情操变得高尚，苦难在大多数情况下只会让人变得心胸狭窄，苦大仇深。我当时还没觉察到人性是多么矛盾，不知道真挚的情感中会有多少矫揉造作，高贵优雅中会有多少卑劣低贱，也不知道罪孽中会有多少良善仁慧。',
                time: '2019-2-12 22:36',
                src: pic1
            },
            {
                name: '花火',
                desc: '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃流的话。能做事的做事，能发声的发声。有一分热，发一分光。就令萤火一般，也可以在黑暗里发一点光，不必等候炬火。此后如竟没有炬火，我便是唯一的光。',
                time: '2019-2-28 20:58',
                src: pic2
            },
            {
                name: '云海',
                desc: '我的宿命分两段，未遇见你时，和遇见你以后。你治好我的忧郁，而后赐我悲伤。忧郁和悲伤之间的片刻欢喜，透支了我生命全部的热情储蓄。想饮一些酒，让灵魂失重，好被风吹走。可一想到终将是你的路人，便觉得，沦为整个世界的路人。风虽大，都绕过我灵魂。',
                time: '2019-3-8 18:09',
                src: pic3
            },
            {
                name: '海岛',
                desc: '其实绝大部分吸上了“蓝色鸦片”(对潜水上瘾)的人都是很纯正的海岛控,一有假期,甚至用周末挤出一个几天的小假也要跑到东南亚找个海岛赶紧吸两口缓解一下毒瘾。',
                time: '2019-5-16 8:32',
                src: pic4
            },
            {
                name: '猫头鹰',
                desc: '本目鸟类瞳孔很大，使光线易于入眼，视网膜中视杆细胞（只有一种视觉色素，即视紫红质能辨明暗，不能辨别细节和颜色）非常丰富，却不含视锥细胞（在强光刺激下方会被激活，有三种视觉色素，能辨细节和颜色），以至眼内成圆柱状（而非球状），对弱光也有良好的敏感性，适合夜间活动。',
                time: '2019-6-1 10:45',
                src: pic5
            },
            {
                name: '生活就像跳进冰冷的湖水',
                desc: '当你老了，回顾一生，就会发觉：什么时候出国读书，什么时候决定做第一份职业、何时选定了对象而恋爱、什么时候结婚，其实都是命运的巨变。只是当时站在三岔路口，眼见风云千樯，你作出选择的那一日，在日记上，相当沉闷和平凡，当时还以为是生命中普通的一天。',
                time: '2019-6-5 14:20',
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
                    const { activeIndex } = this
                    self.setState({
                        activeIndex
                    })
                }
            }
        })
    }

    render() {
        const { imageList, activeIndex } = this.state
        const { src: picSrc, name, desc, time } = imageList[activeIndex]

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
              <article className="right-part">
                <h2 className="title">{name}</h2>
                <p className="desc">{desc}</p>
                <time className="time">{time}</time>
              </article>
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
