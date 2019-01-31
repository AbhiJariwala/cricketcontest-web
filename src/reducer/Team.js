const INITIAL_STATE = {
    TeamData:[],
    TeamAddData:[],
    error_msg:"",
    updateTeamData: [],
}
export const Fetch_Data = "Fetch_Data";
export const update_Team_data = "update_Team_data";
export const Add_Team_Data = "Add_Team_Data";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case update_Team_data: { 
            let id = parseInt(action.updateTeamData.id, 10);          
            return Object.assign({}, state, {
                TeamData: state.TeamData.map(item => {
                    return item.id === id ? action.updateTeamData : item;
                })
            });
        }
        case Fetch_Data: {
            return Object.assign({}, state, {TeamData:action.TeamData });
        }        
        case Add_Team_Data: {            
            state.TeamData.unshift(action.TeamAddData)
            return Object.assign({}, state, {
                TeamData:state.TeamData.concat(action.TeamAddData)
             });             
        }        
        case INVALID_DATA: {
            return Object.assign({}, state, {error_msg:action.error_msg });
        }        
         default:
            return state
    }
}



