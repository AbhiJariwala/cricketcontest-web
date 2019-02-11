import * as tournamentMatchService from '../service/TournamentMatch'

import { GET_TOURNAMENTMATCHS, GET_ALLTOURNAMENTMATCHS, INVALID_DATA, ADD_TOURNAMENTMATCHS} from '../reducer/TournamentMatch';

export const getTournamentMatch = (id) => {
    return (dispatch) => {
        tournamentMatchService.getTournamentMatch(id)
        .then((response) => {
            if (response.status === 200) {
                var data=response.data;
                dispatch(
                    {
                        type: GET_TOURNAMENTMATCHS,
                        allmatchs:data
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

export const SelectTournamentMatchAction = (pageno, parpageRecord, sorting, fieldName) =>  {
    return (dispatch) => {
        tournamentMatchService.SelectTournamentMatchAction(pageno, parpageRecord, sorting, fieldName)
        .then((response) => {
            if (response.status === 200) {
                var data=response.data;
                dispatch(
                    {
                        type: GET_ALLTOURNAMENTMATCHS,
                        allmatchs:data
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

export const AddTournamentMatchAction = (data) =>  {
    return (dispatch) => {
        tournamentMatchService.addTournamentMatch(data)
        .then((response) => {
            if (response.status === 200) {
                var data=response.data;
                dispatch(
                    {
                        type: ADD_TOURNAMENTMATCHS,
                        data:data
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