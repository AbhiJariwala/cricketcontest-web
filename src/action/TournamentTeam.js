import * as authService from '../service/TournamentTeam';

import { INVALID_DATA} from '../reducer/TournamentTeam';
import {Add_New_Team} from '../reducer/Tournament';
export const AddTournamentTeamAction = (data,team) => {
    return (dispatch) => {
        authService.addTournamentTeam(data).then((response) => {
            if (response.status === 200) {   
                dispatch(
                    {
                        
                        type: Add_New_Team,
                        TournamentTeamAddData: data,
                        newTeam: team
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