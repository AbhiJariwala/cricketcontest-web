import * as authService from '../../service/user/Createteam';
import { Create_Team_Data,FAILED } from '../../reducer/User/CreateTeam';

export const createTeam = (data) => {

    return (dispatch) => {
        authService.createTeamService(data)
            .then((response) => {

                if (response.status === 200) {                    
                    dispatch({
                        type: Create_Team_Data,
                        CreateTeamAddData: response.data
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