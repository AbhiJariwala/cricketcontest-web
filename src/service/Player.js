import baseService from './baseService';
export function Player() {
    return baseService.get('/api/player/0/2/id/ASC');
}
export function PlayerAdd(data) {
    return baseService.post('/api/player', data);
}
