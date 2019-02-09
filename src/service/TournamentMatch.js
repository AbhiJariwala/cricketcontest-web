import baseService from './baseService';

<<<<<<< HEAD
export function getTournamentMatch(id){
    return baseService.get('/api/tournamentMatch/'+id);
}

export function getAllTournamentMatch(){
    return baseService.get('/api/tournamentMatch');
}

export function SelectTournamentMatchAction(pageno, parpageRecord,sorting, fieldName){
    debugger;
    return baseService.get('/api/tournamentMatch/'+pageno+'/'+parpageRecord+'/'+fieldName+'/'+sorting);
}
=======
export function getTournamentMatch(pageno, parpageRecord, filedName, sortType) {
    return baseService.get('/api/tournamentmatch/' + pageno + '/' + parpageRecord + '/' + filedName + '/' + sortType);
}
>>>>>>> c5991c767d37e020db341f6be6a488339c7abb43
