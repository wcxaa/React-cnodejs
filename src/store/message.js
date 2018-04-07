import Resource from 'redux-thunk-resource';

const resource = new Resource();

export const setNotReadCount = resource.createAction(notReadCount => () => ({ notReadCount }));

export default resource.createReducer({
    notReadCount: 0,
});
