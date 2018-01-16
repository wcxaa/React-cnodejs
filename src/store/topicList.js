import { fetch } from '@js/utils';

const APPEND_TOPIC_LIST = Symbol('appendTopicList');
const SET_SEARCH_KEY = Symbol('setSearchKey');
const SET_IS_FETCHING = Symbol('setIsFetching');
const CLEAR_TOPIC_LIST = Symbol('clearTopicList');

const appendTopicList = topicList => ({ type: APPEND_TOPIC_LIST, topicList });

const setSearchKey = searchKey => ({
    type: SET_SEARCH_KEY,
    searchKey,
});

const setIsFetching = isFetching => ({ type: SET_IS_FETCHING, isFetching });

const clearTopicList = () => ({ type: CLEAR_TOPIC_LIST });

export const fetchTopicList = passedSearchKey => async (dispatch, getState) => {
    dispatch(setSearchKey(passedSearchKey));
    const { topicList: { searchKey } } = getState();

    let res = null;
    try {
        dispatch(setIsFetching(true));
        res = await fetch('/topics', {
            params: searchKey,
        });
    } finally {
        dispatch(setIsFetching(false));
    }

    dispatch(appendTopicList(res.data.data));
};

export const fetchNextPageTopicList = () => async (dispatch, getState) => {
    const { topicList: { searchKey } } = getState();
    dispatch(fetchTopicList({ page: searchKey.page + 1 }));
};

export const fetchTopicListByTab = tab => async dispatch => {
    dispatch(clearTopicList());
    dispatch(fetchTopicList({ tab, page: 1 }));
};

export default (
    state = {
        data: [],
        searchKey: {
            page: 1,
            tab: 'all',
            limit: 20,
            mdrender: true,
        },
        isFetching: false,
    },
    action,
) => {
    switch (action.type) {
        case APPEND_TOPIC_LIST:
            return {
                ...state,
                data: [...state.data, ...action.topicList],
            };
        case SET_SEARCH_KEY:
            return {
                ...state,
                searchKey: {
                    ...state.searchKey,
                    ...action.searchKey,
                },
            };
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case CLEAR_TOPIC_LIST:
            return {
                ...state,
                data: [],
            };
        default:
            return state;
    }
};
