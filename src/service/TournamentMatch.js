import baseService from './baseService';

export function getTournamentMatch(id) {
    return baseService.get('/api/tournamentMatch/' + id);
}
export function SelectTournamentMatchAction(pageno, parpageRecord, sorting, fieldName) {
    debugger;
    return baseService.get('/api/tournamentMatch/' + pageno + '/' + parpageRecord + '/' + fieldName + '/' + sorting);
}
