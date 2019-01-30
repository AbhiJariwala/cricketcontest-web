import Dashboard from "views/Dashboard/Dashboard.jsx";
// import Notifications from "views/Notifications/Notifications.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Typography from "views/Typography/Typography.jsx";
// //import TableList from "views/TableList/TableList.jsx";
// import Maps from "views/Maps/Maps.jsx";
// import Upgrade from "views/Upgrade/Upgrade.jsx";
import UserPage from "views/UserPage/UserPage.jsx";
import Tournament from "../views/tournament/tournament";
import TournamentTeam from "../views/TournamentTeam/tournamentTeam";
import Team from "../views/Team/team";
import Player from "../views//Player/Player";
import TeamPlayer from '../views/TeamPlayer/TeamPlayer'

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



  // {
  //   path: "/TournamentTeam",
  //   name: "Tournament Team",
  //   icon: "sport_trophy",
  //   component: TournamentTeam
  // },
  // },
  // { path: "/icons", name: "Icons", icon: "design_image", component: Icons },
  // { path: "/maps", name: "Maps", icon: "location_map-big", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: Notifications
  // },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: Typography
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade
  // },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
