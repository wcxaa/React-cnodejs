import axios from 'axios';
import { parse } from 'qs';
import Timeago from 'timeago.js';
import { PAGE_TYPE_MAP, baseURL } from './constants';

export const getTopicLabel = (top, good, tab) => {
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
};

export const fetch = async (url, config) => {
    try {
        return await axios.request({ ...config, url, baseURL });
    } catch (error) {
        throw new Error(error.response.data.error_msg);
    }
};

export const getQuery = location => {
    if (!(location && location.search)) {
        throw new Error('getQuery: location must be a valid react-route location');
    }
    return parse(location.search.substr(1));
};

export const getTimeago = time => {
    let str = '';

    if (time) {
        let t = new Timeago();
        str = t.format(String(time), 'zh_CN');
    }

    return str;
};
