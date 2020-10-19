import { post } from './ajax_axios.js';
/**
 * @param 
 * @returns {*|Promise|Promise<unknown>}
 */
export const getTopic = () => {
    return post('/topic/findAll');
}

