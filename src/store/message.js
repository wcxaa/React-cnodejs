import Resource from '@js/redux-resource';

const resource = new Resource();

export const setNotReadCount = resource.createAction(notReadCount => () => ({ notReadCount }));

export default resource.createReducer({
    notReadCount: 0,
});
