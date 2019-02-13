import * as tournamentMatchService from '../service/TournamentMatch'
import { GET_TOURNAMENTMATCHS, INVALID_DATA, GET_ALLTOURNAMENTMATCHS } from '../reducer/TournamentMatch';

import * as authService from '../service/TournamentMatch'
export const getTournamentMatch = (id) => {
    return (dispatch) => {
        authService.getTournamentMatch(id)
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
            .catch((error) => {
                debugger;
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};

// export const getAllTournamentMatch = () =>  {
//     return (dispatch) => {
//         authService.getAllTournamentMatch()
//         .then((response) => {
//             if (response.status === 200) {
//                 var data=response.data;
//                 dispatch(
//                     {
//                         type: GET_ALLTOURNAMENTMATCHS,
//                         allmatchs:data
//                     }
//                 );
//             }
//         })
//             .catch((error) => {
//                 if (error.response) {
//                     dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
//                 }
//             })
//     }
// };

export const SelectTournamentMatchAction = (pageno, parpageRecord, sorting, fieldName) => {
    debugger;
    return (dispatch) => {
        authService.SelectTournamentMatchAction(pageno, parpageRecord, sorting, fieldName)
            .then((response) => {
                if (response.status === 200) {
                    debugger;
                    var data = response.data;
                    dispatch(
                        {
                            type: GET_ALLTOURNAMENTMATCHS,
                            allmatchs: data
                        }
                    );
                }
            })
    }
}

export const getTournamentMatchAction = (pageno, parpageRecord, filedName, sortType) => {
    return (dispatch) => {

        tournamentMatchService.getTournamentMatchAction(pageno, parpageRecord, filedName, sortType)
            .then((response) => {

                if (response.status === 200) {
                    var data = response.data;
                    dispatch(
                        {
                            type: GET_TOURNAMENTMATCHS,
                            tournamentmatchs: data
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