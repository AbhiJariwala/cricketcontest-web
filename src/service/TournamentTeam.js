import baseService from './baseService';

export function addTournamentTeam(data){
    return baseService.post('./api/tournamentteam',data);
}