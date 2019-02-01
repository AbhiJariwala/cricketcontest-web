import * as teamPlayerService from '../service/teamPlayerService';
import { GET_TOURNAMENT, GET_TEAM, GET_PLAYER,ADD_TEAM_PLAYER, FAILED } from '../reducer/teamPlayer';


export const getTournaments = () => {
    return dispatch => {
        teamPlayerService.getTournament()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TOURNAMENT,
                        data: response.data                        
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const getTeamByTournamanetId = (tournamentId) => {
    return dispatch => {
        teamPlayerService.getTeamByTournamanetId(tournamentId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TEAM,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const getPlayers = () => {
    return dispatch => {
        teamPlayerService.getPlayers()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PLAYER,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}

export const AddTeamPlayer = (data) => {
    return dispatch => {
        teamPlayerService.AddTeamPlayer(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_TEAM_PLAYER,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: FAILED,
                    data: error.response.data.error
                })
            })
    }
}
