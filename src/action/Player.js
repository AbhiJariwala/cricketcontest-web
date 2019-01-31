
import * as playerService from '../service/Player';

import { FETCH_PLAYER, INVALID_DATA, ADD_PLAYER, UPDATE_PLAYER,DELETE_PLAYER } from '../reducer/Player';

export const getPlayer = () => {
    return (dispatch) => {
        playerService.getPlayer().then((response) => {
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

export const updatePlayer = (id, player) => {
    let playerObj = {};
    for (var pair of player.entries()) {
            playerObj = { ...playerObj, [pair[0]]: pair[1] };
        }

    return (dispatch) => {
        playerService.updatePlayer(id, player).then((response) => {
            console.log(response.data.playerImage);
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_PLAYER,
                    PlayerUpdateData: {
                        ...playerObj,
                        playerImage : response.data.playerImage
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



// export const getPlayerByID = (id) => {
//     return (dispatch) => {
//         playerService.getPlayerByID(id).then((response) => {
//             debugger
//             if (response.status === 200) {
//                 dispatch({
//                     type: GET_PLAYERBYID,
//                     Player: response.data
//                 });
//             }
//         }).catch((error) => {
//             if (error.response) {
//                 dispatch({ type: INVALID_DATA, data: { error_msg: error.response.data.error } });
//             }
//         })
//     }
// };