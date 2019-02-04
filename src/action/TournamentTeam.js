import * as authService from '../service/TournamentTeam';

import { INVALID_DATA } from '../reducer/TournamentTeam';
import { Add_New_Team, Delete_Team } from '../reducer/Tournament';
export const AddTournamentTeamAction = (data, team) => {

    return (dispatch) => {
        console.log(team);
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

export const DeleteTournamentTeamAction = (tournamentId, teamId) => {
    return (dispatch) => {
        authService.deleteTournamentTeam(tournamentId, teamId).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Delete_Team,
                        teamId: teamId,
                        tournamentId: tournamentId
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