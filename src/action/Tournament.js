//import Service
import * as authService from '../service/Tournament'

import { Fetch_Data, INVALID_DATA, Add_Data, FetchSingleTournament ,updatetournamentdata} from '../reducer/Tournament';
export const SelectTournamentAction = (pageno, parpageRecord, sorting) => {
    return (dispatch) => {
        authService.Tournament(pageno, parpageRecord, sorting).then((response) => {
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
                debugger
                dispatch(
                    {
                        type: Add_Data,
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
                debugger
                console.log(data)
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