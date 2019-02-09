const INITIAL_STATE = {
    createTeamData:[],
    CreateTeamAddData:[],
    error_msg:""
}
export const Fetch_Data = "Fetch_Data";
export const Create_Team_Data = "Create_Team_Data";
export const FAILED = 'FAILED';
export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {          
        case Create_Team_Data: {        
    
            return Object.assign({}, state, {
                CreateTeamAddData:action.CreateTeamAddData
             });             
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg: action.data.error_msg });
        }
        default:
            return state
    }
}