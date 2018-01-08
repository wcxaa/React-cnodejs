const SET_NOT_READ_COUNT = Symbol('setNotReadCound');

export const setNotReadCount = notReadCount => ({
    type: SET_NOT_READ_COUNT,
    notReadCount,
});

export default (state = { notReadCount: 0 }, action) => {
    switch (action.type) {
        case SET_NOT_READ_COUNT:
            return {
                notReadCount: action.notReadCount,
            };
        default:
            return state;
    }
};
