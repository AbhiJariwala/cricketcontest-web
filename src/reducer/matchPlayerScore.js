const INITIAL_STATE = {
    tournaments: [],
    teams: [],
    players: [],
    add_score: [],
    scores: [],
    error_msg: ""
}

export const GET_TOURNAMENT = "GET_TOURNAMENT";
export const GET_TEAM = "GET_TEAM";
export const GET_PLAYER = "GET_PLAYER";
export const GET_SCORE = "GET_SCORE";
export const ADD_SCORE = "ADD_SCORE"
export const FAILED = "FAILED";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOURNAMENT: {
            return Object.assign({}, state, { tournaments : action.data});
        }
        case GET_TEAM: {
            return Object.assign({}, state, { teams : action.data});
        }
        case GET_PLAYER: {
            return Object.assign({}, state, { players : action.data});
        }
        case GET_SCORE: {
            return Object.assign({}, state, { scores : action.data});
        }
        case ADD_SCORE: {
            return Object.assign({}, state, { 
                add_score : action.data,
                scores : [action.data,...state.scores]
            });
        }
        case FAILED: {
            return Object.assign({}, state, { error_msg : ""});
        }
        default:
            return state;
    }
}