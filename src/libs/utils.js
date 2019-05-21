
/**
 * 检测传入的参数类型
 * @param obj {All}	需要进行参数检测的对象
 * @return {String} 所属类型字符串
 */
function typeOf (obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)]
}
function isNumber (obj) {
    return this.typeOf(obj) === 'number' && !isNaN(obj)
}
function isNaN (obj) {
    return obj.toString() === 'NaN'
}
function isString (obj) {
    return this.typeOf(obj) === 'string'
}
function isFunction (obj) {
    return this.typeOf(obj) === 'function'
}
function isArray (obj) {
    return this.typeOf(obj) === 'array'
}
function isObject (obj) {
    return this.typeOf(obj) === 'object'
}
function isUndefined (obj) {
    return this.typeOf(obj) === 'undefined'
}

/**
 * 浏览器全屏
 */
function fullScreen() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}

/**
 * 取消浏览器全屏
 */
function normalScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export {
    typeOf,
    isArray,
    isFunction,
    isNaN,
    isNumber,
    isObject,
    isString,
    isUndefined,
    fullScreen,
    normalScreen
}
