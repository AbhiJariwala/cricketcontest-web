import * as authService from '../service/authService';
import { FAILED, LOGIN_SUCCESSFUL, LOGOUT } from '../reducer/loginReducer';

export const loginUser = (credentials) => {
    return (dispatch) => {
        authService.login(credentials)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.user.token)
                    localStorage.setItem("userId", response.data.user.id)
                    localStorage.setItem("role", response.data.user.role)
                    dispatch({
                        type: LOGIN_SUCCESSFUL,
                        data: { token: response.data.user.token, userId: response.data.user.id,Role:response.data.user.role }
                    });
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({ type: FAILED, data: { error_msg: error.response.data.error } });
                }
            });
    }
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId")
    }
};


