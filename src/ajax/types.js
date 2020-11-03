import {
    get,
    post,
    ajax,
} from './ajax_axios';

export const addTypes = (lesson, part) => {
    return post('/types/add', {
        lesson, part
    });
}

