import {
    get,
    post,
    ajax,
} from './ajax_axios';


export const getTodayAllRank = () => {
    return get('/report/findByUptime');
}

export const getTodayUserRank = () => {
    return get('/report/findRankByOpenid');
}

export const getAllUserRank = () => {
    return get('/report/findRankByNum');
}

export const isDaka = () => {
    return post('/report/identify');
}

export const addDaka = (content, address) => {
    return post('/report/add', {
        content,
        address
    });
}
export const gainReport = () => {
    return post('/gain/report');
}