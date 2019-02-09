const INITIAL_STATE = {
    tournamentmatchs: [],
    allmatchs:[],
    errors: "",
}

export const GET_TOURNAMENTMATCHS = "GET_TOURNAMENTMATCHS";
export const GET_ALLTOURNAMENTMATCHS="GET_ALLTOURNAMENTMATCHS";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOURNAMENTMATCHS: {
            return Object.assign({}, state, { allmatchs: action.allmatchs });
        }
        case GET_ALLTOURNAMENTMATCHS: {
            return Object.assign({}, state, { allmatchs: action.allmatchs });
        }
        case INVALID_DATA: {
             return Object.assign({}, state, { errors: "" });
        }
        default:
            return state;
    }
}