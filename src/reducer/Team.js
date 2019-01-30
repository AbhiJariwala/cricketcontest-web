const INITIAL_STATE = {
    TeamData:[],
    TeamAddData:[],
    error_msg:"",
}
export const Fetch_Data = "Fetch_Data";
export const Add_Data = "Add_Data";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Fetch_Data: {
            return Object.assign({}, state, {TeamData:action.TeamData });
        }        
        case Add_Data: {
            
            return Object.assign({}, state, {
                TeamAddData:action.TeamAddData,
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



