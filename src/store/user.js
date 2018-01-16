import { fetch } from '@js/utils';

const SET_USER = Symbol('setUser');

const SET_IS_HANDLING_LOGIN = Symbol('setIsHandlingLogin');

const setUser = user => ({
    type: SET_USER,
    user,
});

export const setIsHandlingLogin = isHandlingLogin => ({
    type: SET_IS_HANDLING_LOGIN,
    isHandlingLogin,
});

export const handleLogin = token => async dispatch => {
    if (!token) {
        throw new Error('令牌格式错误,应为36位UUID字符串');
    }
    let res = null;
    try {
        dispatch(setIsHandlingLogin(true));
        res = await fetch('/accesstoken', {
            method: 'post',
            data: {
                accesstoken: token,
            },
        });
    } finally {
        dispatch(setIsHandlingLogin(false));
    }
    const data = res.data;
    const user = {
        loginname: data.loginname,
        avatar_url: data.avatar_url,
        id: data.id,
        token,
    };

    dispatch(setUser(user));
};

export default (
    state = {
        id: '',
        loginname: '',
        avatar_url: '',
        token: '',

        isHandlingLogin: false,
    },
    action,
) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.user,
            };
        case SET_IS_HANDLING_LOGIN:
            return {
                ...state,
                isHandlingLogin: action.isHandlingLogin,
            };
        default:
            return state;
    }
};
