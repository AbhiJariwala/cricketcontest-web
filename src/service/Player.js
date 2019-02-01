import baseService from './baseService';
export function getPlayer() {
    return baseService.get('/api/player/0/100/id/ASC');
}
export function addPlayer(data) {
    return baseService.post('/api/player', data);
}
export function updatePlayer(id,data) {
    return baseService.put('/api/player/'+ id, data);
}
export function deletePlayer(id) {
    return baseService.delete('/api/player/'+ id);
}


