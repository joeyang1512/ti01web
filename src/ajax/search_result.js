import {
    get,
    post,
    ajax,
} from './ajax_axios';


export const getSearchResult = (word) => {
    return post('/question/findByWord', {
        word: word
    });
}
