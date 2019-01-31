//import Service
import * as authService from '../service/team';

import { Fetch_Data,INVALID_DATA,Add_Team_Data,updateteamdata} from '../reducer/Team';
export const SelectTeamAction = (pageno, parpageRecord, sorting,filedName) => {
    return (dispatch) => {
        authService.Team(pageno, parpageRecord, sorting,filedName).then((response) => {
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
                        type: Add_Team_Data,
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
export const UpdateTeamAction = (id,data) => {
    return (dispatch) => {
        authService.UpdateTeamdata(id,data).then((response) => {
            if (response.status === 200) {
               
                dispatch(
                    {
                        type: updateteamdata,
                        updateTeamData: data
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