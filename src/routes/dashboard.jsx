import Dashboard from "views/Dashboard/Dashboard.jsx";
import Tournament from "../views/tournament/tournament";
import TournamentTeam from "../views/TournamentTeam/tournamentTeam";
import Team from "../views/Team/team";
import Player from "../views//Player/Player";
import TeamPlayer from '../views/TeamPlayer/TeamPlayer'
// import MatchPlayerScore from '../views/matchPlayerScore/matchPlayerScore'
import TournamentMatchPlayerScore from '../views/TournamentMatchPlayerScore/TournamentMatchPlayerScore'
import TournamentPoint from '../views/tornamentPoints/tournamentPoint'
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard
  },
  {
    path: "/Team",
    name: "Team",
    icon: "sport_trophy",
    component: Team
  },
  {
    path: "/Player",
    name: "Player",
    icon: "sport_user-run",
    component: Player
  },
  {
    path: "/tournament",
    name: "Tournament",
    icon: "sport_trophy",
    component: Tournament
  },
  {
    path: "/TournamentTeam",
    name: "Tournament Team",
    icon: "sport_trophy",
    component: TournamentTeam
  },
  {
    path: "/teamplayer",
    name: "TeamPlayer",
    icon: "sport_trophy",
    component: TeamPlayer
  },
  {
    path: "/TournamentPoint",
    name: "TournamentPoint",
    icon: "sport_trophy",
    component: TournamentPoint
  },
  // {
  //   path: "/matchPlayerScore",
  //   name: "Match Player Score",
  //   icon: "sport_trophy",
  //   component: MatchPlayerScore
  // },

  {
    path: "/TournamentMatchPlayerScore",
    name: "MatchPlayerScore",
    icon: "sport_trophy",
    component: TournamentMatchPlayerScore
  },
  
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
