import BaseService from '../baseService'

export function createTeamService(data) {
    
    return BaseService.post('/api/userplayer', data);
}
export function showMyteams(userid) {    
    
    return BaseService.get('./api/userplayer/'+ userid);
}


