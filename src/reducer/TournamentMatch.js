const INITIAL_STATE = {
    tournamentmatchs: [],
    errors: "",
}

export const GET_TOURNAMENTMATCHS = "GET_TOURNAMENTMATCHS";
export const INVALID_DATA = "INVALID_DATA";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOURNAMENTMATCHS: {
            return Object.assign({}, state, { tournamentmatchs: action.tournamentmatchs });
        }
        case INVALID_DATA: {
             return Object.assign({}, state, { errors: "" });
        }
        default:
            return state;
    }
}