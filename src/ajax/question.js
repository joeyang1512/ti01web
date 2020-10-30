import {
    get,
    post,
    ajax,
} from './ajax_axios';

export const getUserQues = () => {
    return get('/question/findByOpenid');
}
export const getQesNum = () => {
    return get('/question/getNum');
}
