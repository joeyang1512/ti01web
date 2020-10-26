import {
    get,
    post,
    ajax,
} from './ajax_axios';


export const getSearchHot = () => {
    return post('/soso/findHotSoso');
}
