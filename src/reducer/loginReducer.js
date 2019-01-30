const INITIAL_STATE = {
    token: "",
    error_msg: "",
    userId: '',
    email:'',
}
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const FAILED = 'FAILED';
export const LOGOUT = 'LOGOUT';


export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL: {
            return Object.assign({}, state, { token: action.data.token, userId: action.data.userId });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg });
        }
        case LOGOUT: {
            return Object.assign({}, state, { token: "", userId: "" });
        }
        case REGISTER_SUCCESSFUL: {
            return Object.assign({}, state, { email: action.users.email });
        }

        default:
            return state;
    }
}