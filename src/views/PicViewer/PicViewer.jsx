import React from 'react'
import { hot } from 'react-hot-loader/root'
// images
import picture1 from '../../assets/images/banner.jpg'
// style
import './PicViewer.less'

class PicViewer extends React.Component {

    state = {
        focus: false,
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        currentLeft: 0,
        currentTop: 0,
        scale: 1
    }

    componentWillUpdate(nextProps, nextState) {
        const {currentLeft, currentTop} = nextState
        this.changePosition(currentLeft, currentTop)
    }

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

    handleMouseDown = (e) => {
        const viewportDOM = document.getElementById('viewport')
        let { top: startY, left: startX } = this._getOffsetInElement(e, viewportDOM)
        this.setState({
            focus: true,
            startX,
            startY
        })
    }

    handleMouseMove = (e) => {
        const viewportDOM = document.getElementById('viewport')
        const { focus, startX, startY, startTop, startLeft } = this.state
        if (!focus) return

        let { left: currentX, top: currentY } = this._getOffsetInElement(e, viewportDOM)
        let [ diffX, diffY ] = [ currentX - startX, currentY - startY ]

        this.setState({
            currentLeft: startLeft + diffX,
            currentTop: startTop + diffY
        })
    }

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

    handleMouseOver = () => {
        this.handleMouseUp()
    }

    handleMouseWheel = () => {}

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
                   draggable="false"
                   alt="图片"
                   onMouseDown={this.handleMouseDown}
                   onMouseMove={this.handleMouseMove}
                   onMouseUp={this.handleMouseUp}
                   onWheel={this.handleMouseWheel} />
            </div>
          </div>
        )
    }
}

export default hot(PicViewer)
