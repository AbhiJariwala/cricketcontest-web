import BaseService from './baseService';

export const getTournaments = () => {
    return BaseService.get("/api/tournament/0/100/id/asc");
}

export const getTournamentMatchesByTournamentId = (tournamentId) => {
    return BaseService.get("/api/tournament/" + tournamentId);
}

export const getplayersByTournamentMatchId = (tournamentMatchId) => {
    return BaseService.get("/api/tournamentmatch/" + tournamentMatchId);
}

export const addTournamentMatchPlayerScore = (tournamentMatchPlayerScore) => {
    return BaseService.post("api/tournamentmatchplayerscore",tournamentMatchPlayerScore);
}