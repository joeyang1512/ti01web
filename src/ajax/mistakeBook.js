import { post, get } from './ajax_axios';
export const getMistakes = () => {
    return get('/topich/findByRes')
}
