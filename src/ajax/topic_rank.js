import {
    get,
    post,
    ajax,
} from './ajax_axios';


export const getTodayRank = () => {
    return post('/topich/todayrank');
}
export const getAllRank = () => {
    return post('/topich/numrank');
}
export const getMyRank = () => {
    return post('/topich/todayMyRank');
}