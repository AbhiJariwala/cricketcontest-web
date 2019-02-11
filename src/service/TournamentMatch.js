import baseService from './baseService';

export function getTournamentMatch(id){
    return baseService.get('/api/tournamentMatch/'+id);
}

<<<<<<< HEAD
export function getAllTournamentMatch(){
    return baseService.get('/api/tournamentMatch');
}

export function SelectTournamentMatchAction(pageno, parpageRecord,sorting, fieldName){
    return baseService.get('/api/tournamentMatch/'+pageno+'/'+parpageRecord+'/'+fieldName+'/'+sorting);
}

export function addTournamentMatch(data){
    return baseService.post('/api/tournamentMatch/',data);
}

=======
export function SelectTournamentMatchAction(pageno, parpageRecord,sorting, fieldName){    
    return baseService.get('/api/tournamentMatch/'+pageno+'/'+parpageRecord+'/'+fieldName+'/'+sorting);
}
>>>>>>> 9549e5912ba345bc57f6fed1a09ba080019cb7c9
