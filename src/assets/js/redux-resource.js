export default class {
    constructor() {
        this.actionMap = {};
        this._setIsRequesting = this.createAction(isRequesting => () => ({
            isRequesting,
        }));
        this._setError = this.createAction(error => () => ({
            error: error ? { message: error.message } : error,
        }));
        this.initState = { isRequesting: false, error: null };
    }
    createAction = func => {
        const type = Symbol(func.toString());
        this.actionMap[type] = func;
        return (...args) => ({
            type,
            args,
        });
    };
    createRequest = asyncFunc => (...args) => {
        return async (dispatch, ...rest) => {
            try {
                await dispatch(this._setIsRequesting(true));
                dispatch(this._setError(null));
                await asyncFunc(...args)(dispatch, ...rest);
            } catch (error) {
                dispatch(this._setError(error));
            } finally {
                dispatch(this._setIsRequesting(false));
            }
        };
    };
    createReducer = (initState = {}) => (state = { ...initState, ...this.initState }, action) => {
        const handler = this.actionMap[action.type];
        if (handler) {
            return {
                ...state,
                ...handler(...action.args)(state),
            };
        } else {
            return state;
        }
    };
}
