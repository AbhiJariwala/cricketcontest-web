import * as MatchPlayerService from '../service/matchPlayerScore';
import { GET_PLAYER, GET_TEAM, GET_TOURNAMENT, FAILED, ADD_SCORE } from '../reducer/matchPlayerScore';

export const getTournaments = () => {
    return dispatch => {
        MatchPlayerService.getTournaments()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TOURNAMENT,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}

export const getTournamentMatchesByTournamentId = (tournamentId) => {
    return dispatch => {
        MatchPlayerService.getTournamentMatchesByTournamentId(tournamentId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TEAM,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}


export const getplayersByTournamentMatchId = (tournamentMatchId) => {
    return dispatch => {
        MatchPlayerService.getplayersByTournamentMatchId(tournamentMatchId)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_PLAYER,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}

export const addTournamentMatchPlayerScore = (tournamentMatchPlayerScore) => {
    return dispatch => {
        MatchPlayerService.addTournamentMatchPlayerScore(tournamentMatchPlayerScore)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_SCORE,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error.response) {
                    dispatch({
                        type: FAILED,
                        data: error.response.data.error
                    })
                }
            })
    }
}

