const INITIAL_STATE = {
    tournaments: [],
    teams: [],
    players: [],
    addteamplayer: [],
    errors: "",
    teamplayers: [],
    playerofteam: []
}

export const GET_TOURNAMENT = "GET_TOURNAMENT";
export const GET_TEAM = "GET_TEAM";
export const GET_PLAYER = "GET_PLAYER";
export const FAILED = "FAILED";
export const ADD_TEAM_PLAYER = "ADD_TEAM_PLAYER";
export const GET_TEAM_PLAYER = 'GET_TEAM_PLAYER';
export const GET_PLAYER_OF_TEAM = 'GET_PLAYER_OF_TEAM';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TOURNAMENT: {
            return Object.assign({}, state, { tournaments: action.data });
        }

        case GET_TEAM: {
            return Object.assign({}, state, { teams: action.data });
        }

        case GET_PLAYER: {
            return Object.assign({}, state, { players: action.data });
        }

        case ADD_TEAM_PLAYER: {
            return Object.assign({}, state)
        }

        case GET_TEAM_PLAYER: {
            return Object.assign({}, state, { teamplayers: action.data })
        }

        case GET_PLAYER_OF_TEAM: {
            return Object.assign({}, state, { playerofteam: action.data });
        }

        case FAILED: {
            return Object.assign({}, state, { errors: "" });
        }

        default:
            return state;
    }
}