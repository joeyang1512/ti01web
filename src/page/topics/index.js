import './index.less';
import { forumUrl, mineUrl, topicsUrl, mineQesUrl } from '~/util/jumpTo';
import { sinceListener } from '~/util/sinceui';
sinceListener('topics', topicsUrl);
sinceListener('forum', forumUrl);
sinceListener('mine', mineUrl);
sinceListener('net');
sinceListener('cpu');
sinceListener('link');
sinceListener('china');
sinceListener('os');
sinceListener('all');
sinceListener('todayTopic', mineQesUrl + '?id=2')
