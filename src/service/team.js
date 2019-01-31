//import Service
import baseService from './baseService';

export function Team(pageno,parpageRecord,sorting,filedName){
    return baseService.get('./api/team/'+pageno+'/'+parpageRecord+'/'  +  filedName  + '/'+sorting);
}
export function TeamAdd(data){
    return baseService.post('./api/team',data);
}
export function UpdateTeamdata(id,data){
    return baseService.put('./api/team/'+id,data);
}