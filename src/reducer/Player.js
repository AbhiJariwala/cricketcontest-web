const INITIAL_STATE = {
    PlayerData: [],
    PlayerAddData: [],
    Player: [],
    error_msg: "",
}
export const FETCH_PLAYER = "FETCH_PLAYER";
export const ADD_PLAYER = "ADD_PLAYER";
export const UPDATE_PLAYER = "UPDATE_PLAYER";
export const DELETE_PLAYER = "DELETE_PLAYER";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PLAYER: {
            return Object.assign({}, state, { PlayerData: action.PlayerData });
        }
        case ADD_PLAYER: {
            action.PlayerAddData.gender = parseInt(action.PlayerAddData.gender, 10);
            action.PlayerAddData.dob = action.PlayerAddData.dob.slice(0, 10);

            state.PlayerData.splice(-1, 1);
            state.PlayerData.unshift(action.PlayerAddData);
            debugger    
            return Object.assign({}, state, {
                PlayerData: state.PlayerData
            });
        }
        case UPDATE_PLAYER: {
            var uid = parseInt(action.PlayerUpdateData.id, 10);
            var updatedData = state.PlayerData.map(player => {
                return player.id === uid ? action.PlayerUpdateData : player
            })
            return Object.assign({}, state, {
                PlayerData: updatedData
            })
        }
        case DELETE_PLAYER: {           
            var pid = parseInt(action.PlayerDeletedId, 10);
            const newState1 = state.PlayerData.filter((val) => val.id !== pid);
            console.log(newState1);
            debugger
            // var index = state.PlayerData.indexOf(did);
            // state.PlayerData.splice(index, 1);

            return Object.assign({}, state, {
                PlayerData: state.PlayerData
            })
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }
        default:
            return state
    }
}



