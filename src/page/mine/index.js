import './index.less';
import { sinceListener } from '~/util/sinceui';
import { forumUrl, mineUrl, topicsUrl } from '~/util/jumpTo'
sinceListener('topics', topicsUrl);
sinceListener('forum', forumUrl)
sinceListener('mine', mineUrl);
sinceListener('report');
sinceListener('rank');
sinceListener('about');
sinceListener('shoreup');
sinceListener('answer');
sinceListener('gain');
sinceListener('qesBank', '/page/topics/index.html');
sinceListener('forum', '/page/forum/index.html');
