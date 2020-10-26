import {
    get,
    post,
    ajax,
} from './ajax_axios';


export const getAllquestion = () => {
    return get('/question/findAll');
}

export const getTypequestion = (type) => {
    return get('/question/findByType', {
        type: type
    });
}
