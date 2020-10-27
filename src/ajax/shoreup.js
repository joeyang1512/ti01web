import {
    get,
    post,
    ajax,
} from './ajax_axios';


export const getShoreup = () => {
    return get('/shoreup/findByOpenid');
}

