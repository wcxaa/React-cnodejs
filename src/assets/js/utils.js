import { PAGE_TYPE_MAP } from './constants';

export function getTopicLabel(top, good, tab) {
    let str = '';

    if (top) {
        str = '置顶';
    } else if (good) {
        str = '精华';
    } else {
        str = PAGE_TYPE_MAP[tab];
    }

    if (!str) {
        str = '暂无';
    }

    return str;
}
