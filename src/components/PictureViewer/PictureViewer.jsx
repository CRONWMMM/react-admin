import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
// utils
import { isNaN } from 'libs/utils'
// style
import './PictureViewer.less'

let [ viewportDOM, imgDOM ] = [ null, null ]

class PictureViewer extends React.Component {

    static propTypes = {
        width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), // viewport 视口的宽度
        height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]), // viewport 视口的高度
        minimum: PropTypes.number, // 缩放的最小尺寸【零点几】
        maximum: PropTypes.number, // 缩放的最大尺寸
        rate: PropTypes.number, // 缩放的速率
        children: PropTypes.object.isRequired, // slot 插槽
        className: PropTypes.string, // className
        center: PropTypes.bool // 图片位置是否初始居中
    }

    static defaultProps = {
        width: '600px',
        height: '400px',
        minimum: 0.8,
        maximum: 8,
        rate: 10,
        center: true
    }

    state = {
        focus: false, // 鼠标是否按下，处于可拖动状态
        imageWidth: 0, // 图片宽度
        imageHeight: 0, // 图片高度
        startX: 0, // 鼠标按下时，距离 viewport 的初始 X 位置
        startY: 0, // 鼠标按下时，距离 viewport 的初始 Y 位置
        startLeft: 0, // 图片距离 viewport 的初始 Left
        startTop: 0, // 图片距离 viewport 的初始 Top
        currentLeft: 0, // 图片当前距离 viewport 的 left
        currentTop: 0, // 图片当前距离 viewport 的 top
        scale: 1 // 图片缩放比率 minimum - maximum
    }

    componentDidMount() {
        viewportDOM = document.getElementById('viewport')
        imgDOM = viewportDOM.getElementsByTagName('img')[0]

        const { width, height } = this.props
        this.initViewport(width, height)
        // 这边需要将滚轮事件使用原生绑定来处理
        // 从而解决新版本 chrome 浏览器带来的 passive event listener
        // 在对图片进行滚动缩放时无法使用 e.preventDefault 来禁用浏览器滚动问题
        imgDOM.addEventListener('wheel', this.handleMouseWheel, { passive: false })

        this.initPictureInfo()
    }

    componentWillReceiveProps() {
        this.initPictureInfo()
    }

    componentWillUpdate(nextProps, nextState) {
        const {currentLeft, currentTop} = nextState
        this.changePosition(currentLeft, currentTop)
    }

    initViewport = (width, height) => {
        // 如果是字符串，就将字符串作为尺寸设置；否则是数字的话，就在后面加 px 设置
        viewportDOM.style.width = isNaN(+width) ? width : `${width}px`
        viewportDOM.style.height = isNaN(+height) ? height: `${height}px`
    }

    /**
     * 图片初始化，包括：
     * 1. 初始图片位置居中
     * 2. 记录初始图片尺寸
     */
    initPictureInfo = () => {
        if (!imgDOM.clientWidth || !imgDOM.clientHeight) {
            return setTimeout(this.initPictureInfo, 0)
        }

        const { center } = this.props
        this.changeToContain(center)
    }

    /**
     * 设置图片尺寸为 contain
     * @param center {Boolean} 是否需要设置图片默认位置居中
     */
    changeToContain = (center = true) => {
        imgDOM.style.width = imgDOM.style.height = 'auto'
        imgDOM.style.maxWidth = imgDOM.style.maxHeight = '100%'

        // 使用设置 style 方式使图片自适应之后，js 并不能马上就获取到图片的最新尺寸
        // 所以需要延时处理
        setTimeout(() => {
            const [ viewPortWidth, viewPortHeight ] = [ viewportDOM.clientWidth, viewportDOM.clientHeight ]
            const [ imageWidth, imageHeight ] = [ imgDOM.clientWidth, imgDOM.clientHeight ]

            // 设置图片默认位置居中
            const [ top, left ] = [ center ? (viewPortHeight - imageHeight) / 2 : 0, center ? (viewPortWidth - imageWidth) / 2 : 0 ]
            center && this.changePosition(left, top)

            this.setState({
                imageWidth,
                imageHeight,
                currentLeft: left,
                currentTop: top,
                startLeft: left,
                startTop: top
            })
        },0)
    }

    /**
     * 设置图片尺寸为 cover
     */
    changeToCover() {} // eslint-disable-line

    /**
     * 改变图片位置
     * @param currentLeft {Number} 当前 left
     * @param currentTop {Number} 当前 top
     */
    changePosition(currentLeft, currentTop) {
        imgDOM.style.top = `${currentTop}px`
        imgDOM.style.left = `${currentLeft}px`
    }

    /**
     * 调整尺寸
     * @param width
     * @param height
     */
    changeSize(width, height) {
        imgDOM.style.maxWidth = imgDOM.style.maxHeight = 'none'
        imgDOM.style.width = `${width}px`
        imgDOM.style.height = `${height}px`
    }

    /**
     * 处理鼠标按下
     * @param e
     */
    handleMouseDown = (e) => {
        const currentDOM = e.target || e.toElement
        if (currentDOM !== imgDOM) return

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
     * 处理鼠标移出
     */
    handleMouseLeave = () => {
        this.handleMouseUp()
    }

    /**
     * 处理滚轮缩放
     * @param e {Event Object} 事件对象
     */
    handleMouseWheel = (e) => {
        const { minimum, maximum, rate } = this.props
        const { imageWidth: originWidth, imageHeight: originHeight, currentLeft, currentTop, scale: lastScale } = this.state
        const [ imageWidth, imageHeight ] = [ imgDOM.clientWidth, imgDOM.clientHeight ]
        const event = e.nativeEvent || e
        event.preventDefault()
        // 这块的 scale 每次都需要用 1 去加，作为图片的实时缩放比率
        let scale = 1 + event.wheelDelta / (12000 / rate)

        // 最小缩放至 minimum 就不能再缩小了
        // 最大放大至 maximum 倍就不能再放大了
        if ((lastScale <= minimum && scale < 1) || (lastScale >= maximum && scale > 1)) return

        // 真实的图片缩放比率需要用尺寸相除
        let nextScale = imageWidth * scale / originWidth

        // 进行缩放比率检测
        // 如果小于最小值，使用原始图片尺寸和最小缩放值
        // 如果大于最大值，使用最大图片尺寸和最大缩放值
        nextScale = nextScale <= minimum ? minimum : nextScale >= maximum ? maximum : nextScale
        let currentImageWidth = nextScale * originWidth
        let currentImageHeight = nextScale * originHeight

        let { left, top } = this._getOffsetInElement(e, imgDOM)
        let rateX = left / imageWidth
        let rateY = top / imageHeight
        let newLeft = rateX * currentImageWidth
        let newTop = rateY * currentImageHeight

        // 改变图片尺寸
        this.changeSize(currentImageWidth, currentImageHeight)

        this.setState({
            scale: nextScale,
            startLeft: currentLeft + (left - newLeft),
            startTop: currentTop + (top - newTop),
            currentLeft: currentLeft + (left - newLeft),
            currentTop: currentTop + (top - newTop)
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
     * 获取某个 DOM 元素相对视口的位置信息
     * @param el {object} 目标元素
     * @return object {object} 位置信息对象
     */
    _getOffset = (el) => {
        const doc = document.documentElement
        const docClientWidth = doc.clientWidth
        const docClientHeight = doc.clientHeight
        let positionInfo = el.getBoundingClientRect()
        return {
            left: positionInfo.left,
            top: positionInfo.top,
            right: docClientWidth - positionInfo.right,
            bottom: docClientHeight - positionInfo.bottom
        }
    }

    render() {
        const { children, className } = this.props
        return (
          <div id="viewport"
               className={`picture-viewer-component ${className}`}
               onMouseLeave={this.handleMouseLeave}
               onMouseDown={this.handleMouseDown}
               onMouseMove={this.handleMouseMove}
               onMouseUp={this.handleMouseUp}>
            {children}
          </div>
        )
    }
}

export default hot(PictureViewer)
