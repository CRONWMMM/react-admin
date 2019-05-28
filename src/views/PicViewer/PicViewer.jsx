import React from 'react'
import { hot } from 'react-hot-loader/root'
// images
import picture1 from '../../assets/images/banner.jpg'
// style
import './PicViewer.less'

class PicViewer extends React.Component {

    state = {
        focus: false,
        imageWidth: 0,
        imageHeight: 0,
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        currentLeft: 0,
        currentTop: 0,
        scale: 1
    }

    componentDidMount() {
        const viewportDOM = document.getElementById('viewport')
        const imgDOM = viewportDOM.getElementsByTagName('img')[0]
        // 延迟 20ms 执行
        setTimeout(this.initPictureInfo, 20)
        // 这边需要将滚轮事件使用原生绑定来处理
        // 从而解决新版本 chrome 浏览器带来的 passive event listener
        // 在对图片进行滚动缩放时无法使用 e.preventDefault 来禁用浏览器滚动问题
        imgDOM.addEventListener('wheel', this.handleMouseWheel, { passive: false })
    }

    componentWillUpdate(nextProps, nextState) {
        const {currentLeft, currentTop} = nextState
        this.changePosition(currentLeft, currentTop)
    }

    /**
     * 图片初始化，包括：
     * 1. 初始图片位置居中
     * 2. 记录初始图片尺寸
     */
    initPictureInfo = () => {
        const viewportDOM = document.getElementById('viewport')
        const imgDOM = viewportDOM.getElementsByTagName('img')[0]
        const [ viewPortWidth, viewPortHeight ] = [ viewportDOM.clientWidth, viewportDOM.clientHeight ]
        const [ imageWidth, imageHeight ] = [ imgDOM.clientWidth, imgDOM.clientHeight ]
        const [ top, left ] = [ (viewPortHeight - imageHeight) / 2, (viewPortWidth - imageWidth) / 2 ]

        this.setState({
            imageWidth,
            imageHeight,
            currentLeft: left,
            currentTop: top,
            startLeft: left,
            startTop: top
        })

        this.changePosition(left, top)
    }

    changeToContain() {} // eslint-disable-line

    changeToCover() {} // eslint-disable-line

    /**
     * 改变图片位置
     * @param currentLeft {Number} 当前 left
     * @param currentTop {Number} 当前 top
     */
    changePosition(currentLeft, currentTop) {
        const imgDOM = document.getElementById('viewport').getElementsByTagName('img')[0]
        imgDOM.style.top = `${currentTop}px`
        imgDOM.style.left = `${currentLeft}px`
    }

    /**
     * 调整尺寸
     * @param width
     * @param height
     */
    changeSize(width, height) {
        const imgDOM = document.getElementById('viewport').getElementsByTagName('img')[0]
        imgDOM.style.maxWidth = imgDOM.style.maxHeight = 'none'
        imgDOM.style.width = `${width}px`
        imgDOM.style.height = `${height}px`
    }

    /**
     * 处理鼠标按下
     * @param e
     */
    handleMouseDown = (e) => {
        const viewportDOM = document.getElementById('viewport')
        let { top: startY, left: startX } = this._getOffsetInElement(e, viewportDOM)
        this.setState({
            focus: true,
            startX,
            startY
        })
    }

    /**
     * 处理鼠标移动
     * @param e
     */
    handleMouseMove = (e) => {
        const { focus, startX, startY, startTop, startLeft } = this.state
        if (!focus) return
        const viewportDOM = document.getElementById('viewport')

        let { left: currentX, top: currentY } = this._getOffsetInElement(e, viewportDOM)
        let [ diffX, diffY ] = [ currentX - startX, currentY - startY ]

        this.setState({
            currentLeft: startLeft + diffX,
            currentTop: startTop + diffY
        })
    }

    /**
     * 处理鼠标放开
     */
    handleMouseUp = () => {
        const { currentLeft, currentTop } = this.state
        this.setState({
            focus: false,
            startX: 0,
            startY: 0,
            startLeft: currentLeft,
            startTop: currentTop
        })
    }

    /**
     * 处理鼠标移入移出
     */
    handleMouseOver = () => {
        this.handleMouseUp()
    }

    /**
     * 处理滚轮缩放
     * @param e {Event Object} 事件对象
     */
    handleMouseWheel = (e) => {
        const { imageWidth: width, imageHeight: height, startLeft, startTop } = this.state
        const imgDOM = document.getElementById('viewport').getElementsByTagName('img')[0]
        const [ imageWidth, imageHeight ] = [ imgDOM.clientWidth, imgDOM.clientHeight ]
        const event = e.nativeEvent || e
        event.preventDefault()
        // 这块的 scale 每次都需要用 1 去加，作为图片的实时缩放比率
        let scale = 1 + event.wheelDelta / 1200
        let currentImageWidth = imageWidth * scale
        let currentImageHeight = imageHeight * scale
        // 真实的图片缩放比率需要用尺寸相除
        let stateScale = currentImageWidth / width

        // 改变图片尺寸
        this.changeSize(currentImageWidth, currentImageHeight)

        const viewportDOM = document.getElementById('viewport')
        let { left, right, top, bottom } = this._getOffsetInElement(e, viewportDOM)
        let rateX = left / right
        let rateY = top / bottom
        let diffX = (width - currentImageWidth) / 2
        let diffY = (height - currentImageHeight) / 2

        this.setState({
            scale: stateScale,
            currentLeft: startLeft + rateX * diffX,
            currentTop: startTop + rateY * diffY
        })
    }

    /**
     * 获取鼠标当前相对于某个元素的位置
     * @param e        {object}    原生事件对象
     * @param target {DOMobject} 目标DOM元素
     * @return object 包括offsetLeft和offsetTop
     *
     * Tips:
     * 1.offset 相关属性在 display: none 的元素上失效，为0
     * 2.offsetWidth/offsetHeight 包括border-width，clientWidth/clientHeight不包括border-width，只是可见区域而已
     * 3.offsetLeft/offsetTop 是从当前元素边框外缘开始算，一直到定位父元素的距离，clientLeft/clientTop其实就是border-width
     */
    _getOffsetInElement = (e, target) => {
        let currentDOM = e.target || e.toElement
        if (!this._inTargetArea(currentDOM, target)) return null
        let left, top, right, bottom
        const { left: x, top: y } = this._getOffset(target)
        left = e.clientX - x
        top = e.clientY - y
        right = target.offsetWidth - left
        bottom = target.offsetHeight - top
        return { top, left, right, bottom }
    }

    /**
     * 判断一个DOM元素是否包裹在另一个DOM元素中【父子关系或者层级嵌套都可以】
     * @param  {Object} DOM         事件对象中的event.target/或者是需要检测的DOM元素
     * @param  {Object} targetDOM   作为限制范围的DOM元素
     * @return {Boolean}            true----是包裹关系，false----不是包裹关系
     */
    _inTargetArea = (DOM, targetDOM) => {
        if (DOM === targetDOM) return true
        let parent = DOM.parentNode
        while (parent != null) {
            if (parent === targetDOM) return true
            DOM = parent
            parent = DOM.parentNode
        }
        return false
    }

    /**
     * 获取某个 DOM 元素相对页面的offset
     * @param el {object} 目标元素
     * @return object 包括offsetLeft和offsetTop
     */
    _getOffset = (el) => {
        const doc = document.documentElement
        let [ left, top, right, bottom, parent ] = [0, 0, 0, 0, el.offsetParent]
        while (parent != null) {
            left += el.offsetLeft
            top += el.offsetTop
            el = parent
            parent = el.offsetParent
        }
        right = doc.offsetWidth - el.offsetWidth - left
        bottom = doc.offsetHeight - el.offsetHeight - top
        return {
            left,
            top,
            right,
            bottom
        }
    }

    render() {
        return (
          <div className="picture-viewer-page">
            <div id="viewport"
                 className="viewport"
                 onMouseOver={this.handleMouseOver}>
              <img src={picture1}
                   alt="图片"
                   draggable="false"
                   onMouseDown={this.handleMouseDown}
                   onMouseMove={this.handleMouseMove}
                   onMouseUp={this.handleMouseUp} />
            </div>
          </div>
        )
    }
}

export default hot(PicViewer)
