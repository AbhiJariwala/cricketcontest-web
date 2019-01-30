//import Service
import * as authService from '../service/team';

import { Fetch_Data,INVALID_DATA,Add_Data} from '../reducer/Team';
export const selectTeamAction = () => {
    return (dispatch) => {
        authService.Team().then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Fetch_Data,
                        TeamData: response.data                        
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
export const AddTeamAction = (data) => {
    return (dispatch) => {
        authService.TeamAdd(data).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Add_Data,
                        TeamAddData: response.data                        
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