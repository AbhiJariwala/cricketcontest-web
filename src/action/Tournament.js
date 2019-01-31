import * as authService from '../service/Tournament'

import { Fetch_Data, INVALID_DATA, FetchSingleTournament ,updatetournamentdata,Add_Tournament_Data} from '../reducer/Tournament';
export const SelectTournamentAction = (pageno, parpageRecord, sorting,filedName) => {
    return (dispatch) => {
        authService.Tournament(pageno, parpageRecord, sorting,filedName).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: Fetch_Data,
                        TournamentData: response.data
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
export const AddTournamentAction = (data) => {
    return (dispatch) => {
        authService.TournamentAdd(data).then((response) => {
            if (response.status === 200) {   
                dispatch(
                    {
                        type: Add_Tournament_Data,
                        TournamentAddData: response.data
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
export const FetchSingleTournamentAction = (id) => {
    return (dispatch) => {
        authService.fetchSingleTournamentdata(id).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: FetchSingleTournament,
                        FetchSingleTournamentData: response.data
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
export const UpdateTournamentAction = (id,data) => {
    return (dispatch) => {
        authService.UpdateTournamentdata(id,data).then((response) => {
            if (response.status === 200) {
                dispatch(
                    {
                        type: updatetournamentdata,
                        updateTournamentData: data
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