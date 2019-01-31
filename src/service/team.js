import baseService from './baseService';
export function Team(pageno,parpageRecord,sorting,filedName){
    return baseService.get('./api/team/'+pageno+'/'+parpageRecord+'/'+ filedName+'/'+sorting);
}

export function TeamAdd(data){
    return baseService.post('./api/team',data);
}
export function UpdateTeamdata(name,data){
    debugger
    return baseService.put('./api/team/'+name,data);
}