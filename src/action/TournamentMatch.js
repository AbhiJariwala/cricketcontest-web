import * as tournamentMatchService from '../service/TournamentMatch'

<<<<<<< HEAD
import { GET_TOURNAMENTMATCHS, GET_ALLTOURNAMENTMATCHS, INVALID_DATA} from '../reducer/TournamentMatch';

export const getTournamentMatch = (id) => {
    return (dispatch) => {
        authService.getTournamentMatch(id)
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

export const SelectTournamentMatchAction = (pageno, parpageRecord, sorting, fieldName) =>  {
    debugger;
    return (dispatch) => {
        authService.SelectTournamentMatchAction(pageno, parpageRecord, sorting, fieldName)
        .then((response) => {
            if (response.status === 200) {
                debugger;
                var data=response.data;
                dispatch(
                    {
                        type: GET_ALLTOURNAMENTMATCHS,
                        allmatchs:data
                    }
                );
            }
        })
=======
import { GET_TOURNAMENTMATCHS, INVALID_DATA } from '../reducer/TournamentMatch';

export const SelectTournamentMatchAction = (pageno, parpageRecord, filedName, sortType) => {
    return (dispatch) => {
        
        tournamentMatchService.getTournamentMatch(pageno, parpageRecord, filedName, sortType)        
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
>>>>>>> c5991c767d37e020db341f6be6a488339c7abb43
            .catch((error) => {
                if (error.response) {
                    dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
                }
            })
    }
};