import Dashboard from "views/Dashboard/Dashboard.jsx";
import Tournament from "../views/tournament/tournament";
import Team from "../views/Team/team";
import Player from "../views//Player/Player";
import TeamPlayer from '../views/TeamPlayer/TeamPlayer';
import TournamentMatch from '../views/TournamentMatch/tournamentmatch'
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
    path: "/tournament",
    name: "Tournament",
    icon: "sport_trophy",
    component: Tournament
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
    path: "/teamplayer",
    name: "Tournament Team Player",
    icon: "sport_user-run",
    component: TeamPlayer
  },
  {
    path: "/TournamentMatchs",
    name: "Tournament Match",
    icon: "sport_user-run",
    component: TournamentMatch
  },
  {
    path: "/TournamentPoint",
    name: "Tournament Point",
    icon: "sport_trophy",
    component: TournamentPoint
  },
  {
    path: "/TournamentMatchPlayerScore",
    name: "Match Player Score",
    icon: "sport_trophy",
    component: TournamentMatchPlayerScore
  },

  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
