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
    name: "Tournaments",
    icon: "sport_trophy",
    component: Tournament
  },
  {
    path: "/Team",
    name: "Teams",
    icon: "text_caps-small",
    component: Team
  },
  {
    path: "/Player",
    name: "Players",
    icon: "sport_user-run",
    component: Player
  },
  {
    path: "/teamplayer",
    name: "Tournament Team Players",
    icon: "design_bullet-list-67",
    component: TeamPlayer
  },
  {
    path: "/TournamentMatchs",
    name: "Tournament Matches",
    icon: "location_map-big",
    component: TournamentMatch
  },
  {
    path: "/TournamentPoint",
    name: "Tournament Points",
    icon: "business_money-coins",
    component: TournamentPoint
  },
  {
    path: "/TournamentMatchPlayerScore",
    name: "Match Player Scores",
    icon: "education_paper",
    component: TournamentMatchPlayerScore
  },

  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
