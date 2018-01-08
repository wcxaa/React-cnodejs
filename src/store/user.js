import axios from 'axios';
import { baseURL } from '@js/constants';

const SET_USER = Symbol('setUser');

const SET_IS_HANDLING_LOGIN = Symbol('setIsHandlingLogin');

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

export const setUser = user => ({
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
        res = await axios.post(
            '/accesstoken',
            {
                accesstoken: token,
            },
            {
                baseURL,
            },
        );
    } catch (error) {
        throw new Error(error.response.data.error_msg);
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
