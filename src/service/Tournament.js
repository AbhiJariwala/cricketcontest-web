//import Service
import baseService from './baseService';
export function Tournament(pageno, parpageRecord, sorting) {
    return baseService.get('./api/tournament/' + pageno + '/' + parpageRecord + '/id/' + sorting);
}
export function TournamentAdd(data) {

    return baseService.post('./api/tournament', data);
}
export function fetchSingleTournamentdata(id) {
    return baseService.get('./api/tournament/' + id);
}
export function UpdateTournamentdata(id, data) {
    return baseService.put('./api/tournament/' + id, data);
}