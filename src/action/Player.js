//import Service
import * as authService from '../service/Player';

import { Fetch_Data, INVALID_DATA, Add_Data } from '../reducer/Player';
export const selectPlayerAction = () => {
    return (dispatch) => {
        authService.Player().then((response) => {
            if (response.status === 200) {
                debugger
                dispatch(
                    {
                        type: Fetch_Data,
                        PlayerData: response.data
                    }
                );
            }
        })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};
export const AddPlayerAction = (data) => {
    return (dispatch) => {
        authService.PlayerAdd(data).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Add_Data,
                        PlayerAddData: response.data
                    }
                );
            }
        })
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};