import baseService from './baseService';

export function addTournamentTeam(data){
    return baseService.post('./api/tournamentteam',data);
}

export function deleteTournamentTeam(id){
    return baseService.delete(`./api/tournamentteam/${id}`);
}