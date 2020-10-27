import { post, get } from './ajax_axios.js';

export const findLoginUser = () => {
    return get('/users/findLoginuser');
}
