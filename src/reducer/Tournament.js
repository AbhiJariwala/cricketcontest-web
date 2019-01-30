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
export const Add_Data = "Add_Data";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case updatetournamentdata: {
            let id = parseInt(action.updateTournamentData.id, 10);
            console.log(action.updateTournamentData);
            var newState = state.TournamentData.map(item => {
                return item.id === id ? action.updateTournamentData : item;
            })
            console.log(newState)
            return Object.assign({}, state, {
                TournamentData: newState
            });
        }
        case FetchSingleTournament: {
            return Object.assign({}, state, { FetchSingleTournamentData: [].concat(action.FetchSingleTournamentData) });
        }
        case Fetch_Data: {
            return Object.assign({}, state, { TournamentData: action.TournamentData });
        }
        case Add_Data: {
            const newstate = state.TournamentData.concat(action.TournamentAddData)
            console.log(newstate)
            return Object.assign({}, state, {
                TournamentAddData: action.TournamentAddData,
                TournamentData: newstate
            });
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state
    }
}