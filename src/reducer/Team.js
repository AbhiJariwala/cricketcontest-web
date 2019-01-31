const INITIAL_STATE = {
    TeamData: [],
    TeamAddData: [],
    updateTeamData: [],
    error_msg: "",
}
export const Fetch_Data = "Fetch_Data";
export const updateteamdata = "updateteamdat";
export const Add_Team_Data = "Add_Team_Data";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case updateteamdata: {
            let id = parseInt(action.updateTeamData.id, 10);
            
            var newState = state.TeamData.map(item => {
                return item.id === id ? action.updateTeamData : item;
            })
           
            return Object.assign({}, state, {
                TeamData: newState
            });
        }
        
        case Fetch_Data: {
            return Object.assign({}, state, { TeamData: action.TeamData });
        }
        case Add_Team_Data: {
            state.TeamData.unshift(action.TeamAddData)
            return Object.assign({}, state, { TeamData: state.TeamData.splice(action.TeamAddData) });
            }
        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state
    }
}