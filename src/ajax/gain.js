import {
  get,
  post,
  ajax,
} from './ajax_axios';
  
  
export const userGain = () => {
  return get('/gain/findByOpenid');
}
  