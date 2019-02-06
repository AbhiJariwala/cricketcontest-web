import baseService from './baseService';
export function TournamentMatch(pageno,parpageRecord,sorting,filedName){
    return baseService.get('/api/tournamentMatch/'+pageno+'/'+parpageRecord+'/'+ filedName+'/'+sorting);
}