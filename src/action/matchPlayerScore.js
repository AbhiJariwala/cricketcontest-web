import * as MatchPlayerService from '../service/matchPlayerScore';
import * as TeamPlayerService from '../service/teamPlayerService';
import { GET_PLAYER, GET_TOURNAMENT, FAILED, GET_TOURNAMENT_MATCHPLAYER_SCORE } from '../reducer/matchPlayerScore';
// ADD_SCORE,GET_TEAM
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

// export const getTournamentMatchesByTournamentId = (tournamentId) => {
//     return dispatch => {
//         MatchPlayerService.getTournamentMatchesByTournamentId(tournamentId)
//             .then((response) => {
//                 if (response.status === 200) {
//                     dispatch({
//                         type: GET_TEAM,
//                         data: response.data
//                     })
//                 }
//             })
//             .catch((error) => {
//                 if (error.response) {
//                     dispatch({
//                         type: FAILED,
//                         data: error.response.data.error
//                     })
//                 }
//             })
//     }
// }

// export const addTournamentMatchPlayerScore = (tournamentMatchPlayerScore) => {
//     return dispatch => {
//         MatchPlayerService.addTournamentMatchPlayerScore(tournamentMatchPlayerScore)
//             .then((response) => {
//                 if (response.status === 200) {
//                     dispatch({
//                         type: ADD_SCORE,
//                         data: response.data
//                     })
//                 }
//             })
//             .catch((error) => {
//                 if (error.response) {
//                     dispatch({
//                         type: FAILED,
//                         data: error.response.data.error
//                     })
//                 }
//             })
//     }
// }

export const getTournamentMatchPlayerScore = (offset, perPageRecord, fieldName, order) => {
    return dispatch => {
        MatchPlayerService.getTournamentMatchPlayerScore(offset, perPageRecord, fieldName, order)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TOURNAMENT_MATCHPLAYER_SCORE,
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

export const getPlayers = (tournamentId, teamId) => {
    return dispatch => {
        TeamPlayerService.getPlayerOfTeam(tournamentId, teamId)
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



