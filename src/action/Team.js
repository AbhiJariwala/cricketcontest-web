//import Service
import * as authService from '../service/team';

import { Get_Team_By_Id } from '../reducer/Team';
import { Fetch_Data, INVALID_DATA, Add_Team_Data, update_Team_data } from '../reducer/Team';
export const selectTeamAction = (pageno, parpageRecord, sorting, filedName) => {
    return (dispatch) => {
        authService.Team(pageno, parpageRecord, sorting, filedName).then((response) => {
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

export const fetchTeamAction = () => {
    return (dispatch) => {
        authService.GetTeams().then((response) => {
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

export const getTeamAction = (id) => {
    return (dispatch) => {
        authService.selectTeam(id).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Get_Team_By_Id,
                        Team: response.data
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
}
export const UpdateTournamentAction = (id, data) => {
    return (dispatch) => {
        authService.UpdateTeamdata(id, data).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: update_Team_data,
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