//import Service
import baseService from './baseService';

export function Team(){
    return baseService.get('./api/team/0/20/teamName/asc');
}
export function TeamAdd(data){
    return baseService.post('./api/team',data);
}