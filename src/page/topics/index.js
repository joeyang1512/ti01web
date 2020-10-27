import './index.less';
import { forumUrl, mineUrl, topicsUrl } from '~/util/jumpTo';
import { sinceListener } from '~/util/sinceui';
sinceListener('topics', topicsUrl);
sinceListener('forum', forumUrl);
sinceListener('mine', mineUrl);
