import * as tournamentMatchService from '../service/TournamentMatch'

<<<<<<< HEAD
import { GET_TOURNAMENTMATCHS, GET_ALLTOURNAMENTMATCHS, INVALID_DATA, ADD_TOURNAMENTMATCHS} from '../reducer/TournamentMatch';
=======
import { GET_TOURNAMENTMATCHS, GET_ALLTOURNAMENTMATCHS, INVALID_DATA } from '../reducer/TournamentMatch';
>>>>>>> 9549e5912ba345bc57f6fed1a09ba080019cb7c9

export const getTournamentMatch = (id) => {
    return (dispatch) => {
        tournamentMatchService.getTournamentMatch(id)
<<<<<<< HEAD
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
=======
            .then((response) => {
                if (response.status === 200) {
                    var data = response.data;
                    dispatch(
                        {
                            type: GET_TOURNAMENTMATCHS,
                            allmatchs: data
                        }
                    );
                }
            })
>>>>>>> 9549e5912ba345bc57f6fed1a09ba080019cb7c9
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};

<<<<<<< HEAD
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
=======
export const SelectTournamentMatchAction = (pageno, parpageRecord, sorting, fieldName) => {
    return (dispatch) => {
        tournamentMatchService.SelectTournamentMatchAction(pageno, parpageRecord, sorting, fieldName)
            .then((response) => {              
                if (response.status === 200) {
                    var data = response.data;
                    dispatch(
                        {
                            type: GET_ALLTOURNAMENTMATCHS,
                            allmatchs: data
                        }
                    );
                }
            })
>>>>>>> 9549e5912ba345bc57f6fed1a09ba080019cb7c9
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};