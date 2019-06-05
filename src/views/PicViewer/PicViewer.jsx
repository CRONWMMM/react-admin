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
                desc: '高级的Bar还有调酒师表演精彩的花式调酒。而Pub多指英式的以酒为主的酒吧，是BAR的一种分支。 酒吧有很多类型和风格，既有最低档的“潜水吧”，也有为社会精英人士提供娱乐的优雅场所。',
                time: '2019-2-12 22:36',
                src: pic1
            },
            {
                name: '花火',
                src: pic2
            },
            {
                name: '云海',
                desc: '云海是自然景观，云海是山岳风景的重要景观之一，所谓云海，是指在一定的条件下形成的云层。并且云顶高度低于山顶高度，当人们在高山之巅俯首云层时，看到的是漫无边际的云，如临于大海之滨，波起峰涌，浪花飞溅，惊涛拍岸。故称这一现象为“云海”。',
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
                name: '歪果仁',
                desc: '歪果仁，意为外国人。歪果仁俗称“老外”，是指在一国境内不具有该国国籍而具有他国国籍的人或用于一国人对他国人的统称。不具有该国国籍的人有时也包括无国籍人。从国家主权原则出发，国家对于境内的一切人和物都享有属地优越权，外国人亦不例外。外国人一进入一国国境就处于该国的属地优越权之下，要服从所在国的管辖，遵守所在国的法令',
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
