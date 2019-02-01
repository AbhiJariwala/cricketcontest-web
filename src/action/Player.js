
import * as playerService from '../service/Player';

import { FETCH_PLAYER, INVALID_DATA, ADD_PLAYER, UPDATE_PLAYER, DELETE_PLAYER } from '../reducer/Player';

export const getPlayer = (start,end) => {
    return (dispatch) => {
        playerService.getPlayer(start,end).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: FETCH_PLAYER,
                    PlayerData: response.data
                });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};
export const addPlayer = (player) => {
    return (dispatch) => {
        playerService.addPlayer(player).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: ADD_PLAYER,
                    PlayerAddData: response.data
                });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};

export const updatePlayer = (player, playerFormData) => {  
    return (dispatch) => {
        playerService.updatePlayer(player.id, playerFormData).then((response) => {
            let playerImage = "";
            (response.data.playerImage) ? playerImage = response.data.playerImage
                : playerImage = player.playerImage

            if (response.status === 200) {
                dispatch({
                    type: UPDATE_PLAYER,
                    PlayerUpdateData: {
                        ...player,
                        playerImage: playerImage
                    }
                });
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};

export const deletePlayer = (id) => {
    return (dispatch) => {
        playerService.deletePlayer(id).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log(response);
                dispatch({
                    type: DELETE_PLAYER,
                    PlayerDeletedId: id
                });
            }
        }).catch((error) => {

            if (error.response) {
                dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
            }
        })
    }
};
