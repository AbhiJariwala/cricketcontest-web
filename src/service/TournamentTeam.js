import baseService from './baseService';

export function addTournamentTeam(data){
    //console.log('service',data);
    return baseService.post('./api/tournamentteam',data);
}