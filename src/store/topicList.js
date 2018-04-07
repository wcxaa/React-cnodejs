import { fetch } from '@js/utils';
import Resource from 'redux-thunk-resource';

const resource = new Resource();

const appendTopicList = resource.createAction(topicList => state => ({
    data: [...state.data, ...topicList],
}));

const setSearchKey = resource.createAction(searchKey => state => ({
    searchKey: { ...state.searchKey, ...searchKey },
}));

const clearTopicList = resource.createAction(() => () => ({
    data: [],
}));

export const fetchTopicList = resource.createRequest(
    passedSearchKey => async (dispatch, getState) => {
        dispatch(setSearchKey(passedSearchKey));
        const { topicList: { searchKey } } = getState();

        const res = await fetch('/topics', {
            params: searchKey,
        });

        dispatch(appendTopicList(res.data.data));
    },
);

export const fetchNextPageTopicList = () => (dispatch, getState) => {
    const { topicList: { searchKey } } = getState();
    dispatch(fetchTopicList({ page: searchKey.page + 1 }));
};

export const fetchTopicListByTab = tab => dispatch => {
    dispatch(clearTopicList());
    dispatch(fetchTopicList({ tab, page: 1 }));
};

export default resource.createReducer({
    data: [],
    searchKey: {
        page: 1,
        tab: 'all',
        limit: 20,
        mdrender: true,
    },
});
