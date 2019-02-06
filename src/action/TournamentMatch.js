import * as authService from '../service/TournamentMatch'

import { GET_TOURNAMENTMATCHS, INVALID_DATA} from '../reducer/TournamentMatch';

export const SelectTournamentMatchAction = (pageno, parpageRecord, sorting,filedName) => {
    return (dispatch) => {
        authService.TournamentMatch(pageno, parpageRecord, sorting,filedName)
        .then((response) => {
            if (response.status === 200) {
                var data=response.data;
                dispatch(
                    {
                        type: GET_TOURNAMENTMATCHS,
                        tournamentmatchs:data
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