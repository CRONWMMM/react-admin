
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
 * 判空函数
 * @param  {obj/arr/str}  检测对象
 */
function isEmpty(obj){
    if (typeOf(obj) === "object") {
        if (Array.isArray(obj)) {		// array
            return !obj.length>0
        }else{							// object
            return !(function(obj) {
                let len = 0;
                for (let key in obj) { // eslint-disable-line
                    len = ++len;
                }
                return len;
            })(obj) > 0;
        }
    } else if (typeOf(obj) === "string"){	// string
        return !(obj.trim()).length>0
    } else {								// error
        throw new Error("empty函数接收的参数类型：对象、数组、字符串");
    }
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

/**
 * 对象深度查找
 * @param target Object 需要处理的原始对象
 * @param callback filter函数
 * @return Object 符合filter筛选条件的对应对象
 */
function findDeeply(target, callback) {
    const flag = typeOf(target)
    let result
    if (flag === 'array') {
        for (let i = 0, len = target.length, item; i < len; i++) {
            item = target[i]
            result = findDeeply(item, callback)
            if (result) return result
        }
    }
    else if (flag === 'object') {
        if (callback(target)) {
            return target
        }
        for (let k in target) {
            result = findDeeply(target[k], callback)
            if (result) return result
        }
    }
}

/**
 * 数组去空【空字符串 null undefined】
 * @param arr Array 需要处理的原始数组
 * @return Array 处理后的数组对象
 *
 */
function arrayDeleteEmpty(arr) {
    let clean = []
    let target = 'null undefined'

    for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i]
        let type = typeOf(item)
        if (type === 'string' && isEmpty(item) || target.indexOf(type) >= 0)
            continue
        clean.push(item)
    }
    return clean
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
    isEmpty,
    fullScreen,
    normalScreen,
    findDeeply,
    arrayDeleteEmpty
}
