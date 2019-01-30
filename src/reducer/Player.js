const INITIAL_STATE = {
    PlayerData:[],
    PlayerAddData:[],
    error_msg:"",
}
export const Fetch_Data = "Fetch_Data";
export const Add_Data = "Add_Data";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Fetch_Data: {
            return Object.assign({}, state, {PlayerData:action.PlayerData });
        }        
        case Add_Data: {
            
            return Object.assign({}, state, {
                PlayerAddData:action.PlayerAddData,
                PlayerData:state.PlayerData.concat(action.PlayerAddData)

             });
             
        }        
        case INVALID_DATA: {
            return Object.assign({}, state, {error_msg:action.error_msg });
        }        
         default:
            return state
    }
}



