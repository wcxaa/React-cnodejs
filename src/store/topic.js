import { fetch } from '@js/utils';
import Resource from '@js/redux-resource.js';

const resource = new Resource();

const setTopic = resource.createAction(topic => () => ({ ...topic }));

export const fetchTopic = resource.createRequest(id => async dispatch => {
    const res = await fetch(`/topic/${id}`);

    dispatch(setTopic(res.data.data));
});

export default resource.createReducer();
