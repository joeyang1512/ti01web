// 时间过滤器
let formatDate = function (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

export {
    formatDate
};


// 判断图片是否为null
let isPicEmpty = function (src) {
    if (src == null) {
        return '/public/img/default.jpg';
    } else {
        return src;
    }
}

export {
    isPicEmpty
};

// 数字过滤器 大于1w +万字 大于1000w +千万
let setNum = function (val) {
    if (!val) return 0;
    let num = val;
    if (val >= 10000000) {
        num = (num / 10000000).toFixed(1) + '千万'
    } else if (val >= 10000) {
        num = (num / 10000).toFixed(1) + '万'
    }
    return num;
}
export {
    setNum
}

// 获取url中"?"符后的字串
let getQueryVariable = function (variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}
export {
    getQueryVariable
}

// 判断时间 是 今天 昨天 还是其他
let compareDate = (timestamp, day = 0) => {
    // timestamp 为要传入的时间戳
    // day 为要减去的日子 因为比较*当天*的话，是不需要减的，所以默认定义成0,
    // 根据上面分析，有些需要参数`time`，有些不需要，所以使用一个函数来区分一下 
    let newDate = (time = null) => {
        return time === null ? new Date() : new Date(time)
    }
    // 这里返回 比较后的值，比较成功，则返回`true`，失败则返回`false`
    return (newDate(timestamp).getDate() == newDate().getDate() - day) && (newDate(timestamp).getMonth() == newDate().getMonth()) && (newDate(timestamp).getYear() == newDate().getYear())
}
export {
    compareDate
}

// 文字过滤 防止评论恶意xss攻击
let encode = function (str) { // 转义过滤
    if (!str || str.length === 0) return '';
    str = str.replace(/>/gm, '&gt;');
    str = str.replace(/</gm, '&lt;');
    str = str.replace(/"/gm, '&quot;');
    str = str.replace(/'/gm, '&apos;');
    return str;
}
export {
    encode
}
// 获取今日0点时间戳
const todayBegin = () => {
    let timestamp = Math.round(
        new Date(new Date().toLocaleDateString()).getTime() / 1000
      ).toString();
    
    return timestamp * 1000;
}
export {
    todayBegin
}