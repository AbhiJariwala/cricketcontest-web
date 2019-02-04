const INITIAL_STATE = {
    TournamentData: [],
    Tournaments:[],
    TournamentAddData: [],
    FetchSingleTournamentData: [],
    updateTournamentData: [],
    error_msg: "",
    Tournamentss:[]
}
export const Fetch_Data = "Fetch_Data";
export const updatetournamentdata = "updatetournamentdata";
export const FetchSingleTournament = "FetchSingleTournament";
export const Add_Data = "Add_Data";
export const INVALID_DATA = "INVALID_DATA";
export const Get_Data = "Get_Data";
export const Get_Tournament_Data = "Get_Tournament_Data";
export const Add_New_Team = "Add_New_Team";
export const Add_Tournament_Data = "Add_Tournament_Data";
export const Delete_Team = "Delete_Team";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case updatetournamentdata: {
            let id = parseInt(action.updateTournamentData.id, 10);
            var newState = state.TournamentData.map(item => {
                return item.id === id ? action.updateTournamentData : item;
            })
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
        case Get_Data: {
            return Object.assign({}, state, { Tournaments: action.TournamentData });
        }
        case Get_Tournament_Data: {
            return Object.assign({}, state, { Tournamentss: action.TournamentData });
        }
        case Add_Data: {
            const newstate = state.TournamentData.concat(action.TournamentAddData);
            return Object.assign({}, state, {
                TournamentAddData: action.TournamentAddData,
                TournamentData: newstate
            });
        }
        case Add_New_Team: {
    
            let tournaments = state.Tournaments;
            let id = action.TournamentTeamAddData.tournamentId;
            let i = tournaments.findIndex(tournament=>{
                return tournament.id===parseInt(id,10);
            })
            tournaments[i].Teams = [...tournaments[i].Teams, action.newTeam]
            return Object.assign({}, state, { Tournaments: tournaments });
        }

        // case Delete_Team:{
        //     //const tournaments = state.Tournaments;
        // }
        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state
    }
}