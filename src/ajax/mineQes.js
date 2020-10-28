import {
    get,
    post,
    ajax,
} from './ajax_axios';


export const getQesByUser = () => {
    return get('/question/findByOpenid');
}

export const getQesByTime = (uptime) => {
    return get('/question/findByUptime', {
        uptime: uptime
    });
}

export const getQesByShore = () => {
    return get('/shoreup/findByOpenid');
}
