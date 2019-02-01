import baseService from './baseService';
export function getPlayer(start ,end) {
    return baseService.get('/api/player/'+start + '/' + end + '/id/ASC');
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


