import { post, get } from './ajax_axios';
export const getMistakes = () => {
    return get('/topich/findByRes')
}
export const addLog = (obj) => {
    return post('/topich/add', obj);
}
export const showRight = (tid) => {
    return post('/topich/pright', { tid });
}

