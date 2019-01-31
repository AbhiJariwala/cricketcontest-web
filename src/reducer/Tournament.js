const INITIAL_STATE = {
    TournamentData: [],
    TournamentAddData: [],
    FetchSingleTournamentData: [],
    updateTournamentData: [],
    error_msg: "",
}
export const Fetch_Data = "Fetch_Data";
export const updatetournamentdata = "updatetournamentdata";
export const FetchSingleTournament = "FetchSingleTournament";
export const Add_Tournament_Data = "Add_Tournament_Data";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {  
    switch (action.type) {
        case updatetournamentdata: { 
            let id = parseInt(action.updateTournamentData.id, 10);          
            return Object.assign({}, state, {
                TournamentData: state.TournamentData.map(item => {
                    return item.id === id ? action.updateTournamentData : item;
                })
            });
        }
        case FetchSingleTournament: {
            return Object.assign({}, state, { FetchSingleTournamentData: [].concat(action.FetchSingleTournamentData) });
        }
        case Fetch_Data: {
            return Object.assign({}, state, { TournamentData: action.TournamentData });
        }
        case Add_Tournament_Data: {
            state.TournamentData.unshift(action.TournamentAddData)
            return Object.assign({}, state, { TournamentData: state.TournamentData.splice(action.TournamentAddData) });
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state
    }
}