import { post } from './ajax_axios.js';
/**
 * @param 
 * @returns {*|Promise|Promise<unknown>}
 */
export const addQuestion = (data) => {
    return post('/question/add', data);
}
