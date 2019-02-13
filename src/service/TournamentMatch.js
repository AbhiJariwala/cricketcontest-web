import baseService from './baseService';


export function getTournamentMatch(id) {
    return baseService.get('/api/tournamentMatch/' + id);
}

export function getAllTournamentMatch() {
    return baseService.get('/api/tournamentMatch');
}

export function SelectTournamentMatchAction(pageno, parpageRecord, sorting, fieldName) {
    debugger;
    return baseService.get('/api/tournamentMatch/' + pageno + '/' + parpageRecord + '/' + fieldName + '/' + sorting);
}
export function getTournamentMatchAction(pageno, parpageRecord, filedName, sortType) {
    return baseService.get('/api/tournamentmatch/' + pageno + '/' + parpageRecord + '/' + filedName + '/' + sortType);
}
