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
