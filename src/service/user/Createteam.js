import BaseService from '../baseService'

export function createTeamService(data) {
    
    return BaseService.post('/api/userplayer', data);
}

