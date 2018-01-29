import { fetch } from '@js/utils';
import Resource from '@js/redux-resource';

const resource = new Resource();

const setUser = resource.createAction(user => () => ({ ...user }));

export const login = resource.createRequest(token => async dispatch => {
    if (!token) {
        throw new Error('令牌格式错误,应为36位UUID字符串');
    }
    const res = await fetch('/accesstoken', {
        method: 'post',
        data: {
            accesstoken: token,
        },
    });

    const user = {
        loginname: res.data.loginname,
        avatar_url: res.data.avatar_url,
        id: res.data.id,
        token,
    };

    dispatch(setUser(user));
});

export default resource.createReducer();
