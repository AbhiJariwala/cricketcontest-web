const INITIAL_STATE = {
    TournamentData: [],
    DeleteTournaments: "",
    Tournaments: [],
    TournamentAddData: [],
    FetchSingleTournamentData: [],
    updateTournamentData: [],
    error_msg: "",
    Tournamentss: []
}
export const deletetournamentdata = "deletetournamentdata";
export const Fetch_Tournament_Data = "Fetch_Tournament_Data";
export const updatetournamentdata = "updatetournamentdata";
export const FetchSingleTournament = "FetchSingleTournament";
export const Add_Data = "Add_Data";
export const INVALID_DATA = "INVALID_DATA";
export const Get_Data = "Get_Data";
export const Get_Tournament_Data = "Get_Tournament_Data";
export const Add_New_Team = "Add_New_Team";
export const Add_Tournament_Data = "Add_Tournament_Data";
export const Delete_Team = "Delete_Team";

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case deletetournamentdata: {
           
            return Object.assign({}, state, {
                Tournaments: action.TournamentAddData
            });
        }
        case updatetournamentdata: {
          
            let id = parseInt(action.updateTournamentData.id, 10);
            var newState = state.Tournaments.map(item => {
                return item.id === id ? action.updateTournamentData : item;
            })
            
            return Object.assign({}, state, {
                Tournaments: newState
            });
        }

        case FetchSingleTournament: {
            return Object.assign({}, state, { FetchSingleTournamentData: [].concat(action.FetchSingleTournamentData) });
        }

        case Fetch_Tournament_Data: {
            return Object.assign({}, state, { TournamentData: action.TournamentData });
        }

        case Get_Data: {
            let tournamentData = action.TournamentData;
            let newTournaments = tournamentData.map((tournament) => {
                let newTeam = tournament.Teams.filter((team) => {
                    return team.TournamentTeam.isDelete === parseInt(0, 10);
                })
                tournament.Teams = newTeam
                return tournament;
            })
            return Object.assign({}, state, { Tournaments: newTournaments });
        }

        case Get_Tournament_Data: {
            return Object.assign({}, state, { Tournamentss: action.TournamentData });
        }

        case Add_Data: {
            const newstate = state.TournamentData.concat(action.TournamentAddData);
            return Object.assign({}, state, {
                TournamentAddData: action.TournamentAddData,
                TournamentData: newstate
            });
        }

        case Add_Tournament_Data: {
            state.Tournaments.splice(-1, 1)
            state.Tournaments.unshift(action.TournamentAddData)
            if(action.TournamentAddData.Teams===undefined){
                let Teams=[];
                action.TournamentAddData={...action.TournamentAddData,Teams};
            }
            return Object.assign({}, state, { Tournaments: state.Tournaments.splice(action.TournamentAddData)});
        }

        case Delete_Team: {            
            let tournamentss = state.Tournaments;
            let teamId = action.teamId;
            let tournamentId = action.tournamentId;
            let k = tournamentss.findIndex(tournament => {
                return tournament.id === parseInt(tournamentId, 10);
            })

            let newTournament = tournamentss[k].Teams.filter((team, i) => {
                return team.id !== teamId;
            })
            
            let tournament_Data = state.Tournamentss;
            tournamentss[k].Teams = newTournament;
            let x = tournament_Data.findIndex(tournament=>{
                return tournament.id===parseInt(tournamentId,10);
            }) 
            let newTournamentData = tournament_Data[x].Teams.filter((team, i) => {
                return team.id !== teamId;
            })
            tournament_Data[x].Teams = newTournamentData;
            return Object.assign({}, state, { Tournaments: [...tournamentss], Tournamentss:[...tournament_Data] });
        }

        case INVALID_DATA: {
            return Object.assign({}, state, { error_msg: action.error_msg });
        }

        case Add_New_Team: {

            let tournamentssData = state.Tournamentss;
            let tournaments = state.Tournaments;
            let id = action.TournamentTeamAddData.tournamentId;
            let i = tournaments.findIndex(tournament => {
                return tournament.id === parseInt(id, 10);
            })
            let j = tournamentssData.findIndex(tournament => {
                return tournament.id === parseInt(id, 10);
            })
            let TournamentTeam = {id:action.tournamentTeamm.id,isDelete:action.tournamentTeamm.isDelete};
            let newTeamm = {...action.newTeam,TournamentTeam};
            if(tournaments[i].Teams===undefined){
                let Teams=[];
                tournaments[i]={...tournaments[i],Teams};
            }
            // tournamentssData[j].Teams = [...tournamentssData[j].Teams, newTeamm];
            tournaments[i].Teams = [...tournaments[i].Teams, newTeamm]
            return Object.assign({}, state, { Tournaments: [...tournaments] });
        }

        default:
            return state
    }
}