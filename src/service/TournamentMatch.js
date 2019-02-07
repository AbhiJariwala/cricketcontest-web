import baseService from './baseService';

export function getTournamentMatch(pageno,parpageRecord,filedName,sortType){
    return baseService.get('/api/tournamentmatch/'+pageno+'/'+parpageRecord+'/'+ filedName+'/'+sortType);
}