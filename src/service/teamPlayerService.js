import BaseService from './baseService';

export function getTournament() {
    return BaseService.get('/api/tournament/0/100/id/asc');
}

export function getTeamByTournamanetId(tournamanetId) {
    return BaseService.get('/api/tournament/' + tournamanetId);
}

export function getPlayers() {
    return BaseService.get('/api/player/0/100/id/asc');
}

export function AddTeamPlayer(data) {
    return BaseService.post('/api/teamplayer', data);
}

export function getPlayerOfTeam(tournamentId, teamId) {
    return BaseService.get('/api/teamplayer/' + tournamentId + "/" + teamId);
}

export function getTeamPlayer() {
    return BaseService.get('/api/teamplayer/0/500/id/asc');
}
