import React from "react";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
import { PanelHeader, Stats } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import path from '../../path';
import * as TotalTournament from '../../action/Tournament';
import * as TotalTeam from '../../action/Team';
import * as TotalPlayer from '../../action/Player';
import * as TotalUser from '../../action/userAction';
import * as MatchAction from '../../action/TournamentMatch';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.action.getTotalTournament.SelectTournamentAction(0, 500, "desc", "id");
    this.props.action.getTotalTeam.selectTeamAction(0, 500, "desc", "id");
    this.props.action.getTotalPlayer.getPlayer(0, 500, "id", "desc");
    this.props.action.getTotalUser.getUser();
    this.props.action.getMatch.SelectTournamentMatchAction(0, 500, "id", "asc");
  }

  render() {
    let tournaments = "", teams = "", players = "", users = "", matchTeam1 = "", matchTeam2 = "", team1Image = "", team2Image = "", matchTournamentName = "";
    if (this.props.tournaments) {
      tournaments = this.props.tournaments.length;
    }
    if (this.props.teams) {
      teams = this.props.teams.length;
    }
    if (this.props.players) {
      players = this.props.players.length;
    }
    if (this.props.users) {
      users = this.props.users.length;
    }
    if (this.props.allmatchs) {
      this.props.allmatchs.map(data => {
        var d1 = data.matchDate.substr(0, 10);
        var d2 = new Date().toISOString().substr(0, 10);
        if (d1 === d2) {
          if (data.Team1 && data.Team2) {
            matchTournamentName = data.Tournament.tournamentName;
            matchTeam1 = data.Team1[0].teamName;
            team1Image = data.Team1[0].teamLogo;
            matchTeam2 = data.Team2[0].teamName;
            team2Image = data.Team2[0].teamLogo;
          }
        }
        return "";
      })
    }

    return (
      <div>
        <PanelHeader size="lg" content={<img alt="Cricket Contest"  style={{width:'100%',height:'fit-content'}} src={path + "Cricket-DashBoard.jpg"}></img>} />
        <div className="content">
          <Row>
            <Col xs={12} md={3}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4" style={{ textAlign: "center" }}>Tournaments</CardTitle>
                </CardHeader>
                <CardBody style={{ height: "150px" }}>
                  <hr />
                  <div className="chart-area">
                    <br />
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>{tournaments}</h1>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons loader_refresh spin",
                        t: "Total Tournaments"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={3}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4" style={{ textAlign: "center" }}>Teams</CardTitle>
                </CardHeader>
                <CardBody style={{ height: "150px" }}>
                  <hr />
                  <div className="chart-area">
                    <br />
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>{teams}</h1>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons loader_refresh spin",
                        t: "Total Teams"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={3}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4" style={{ textAlign: "center" }}>Players</CardTitle>
                </CardHeader>
                <CardBody style={{ height: "150px" }}>
                  <hr />
                  <div className="chart-area">
                    <br />
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>{players}</h1>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons loader_refresh spin",
                        t: "Total Players"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={3}>
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4" style={{ textAlign: "center" }}>Users</CardTitle>
                </CardHeader>
                <CardBody style={{ height: "150px" }}>
                  <hr />
                  <div className="chart-area">
                    <br />
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}>{users - 1}</h1>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons loader_refresh spin",
                        t: "Total Users"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Card className="card-tasks">
                <CardHeader>
                  <CardTitle tag="h4">Today's Match</CardTitle>
                </CardHeader>
                <CardBody>
                  <hr />
                  <div className="chart-area">
                    <br />
                    {matchTeam1 ?
                      <div>
                        <h1 style={{ textAlign: "center" }}>{matchTournamentName} </h1>
                        <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                          <img src={path + team1Image} height="100px" width="100px" alt="Team1"></img>{' '}
                          {matchTeam1} VS {matchTeam2}{' '}
                          <img src={path + team2Image} height="100px" width="100px" alt="Team2"></img>
                        </h3>
                      </div> : <h3 style={{ textAlign: "center" }}>No Match Today</h3>
                    }

                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    tournaments: state.Tournament.TournamentData,
    teams: state.Team.TeamData,
    players: state.Player.PlayerData,
    users: state.User.users,
    allmatchs: state.TournamentMatchs.allmatchs
  }
}

const mapDispatchToProps = (dispatch) => ({
  action: {
    getTotalTournament: bindActionCreators(TotalTournament, dispatch),
    getTotalTeam: bindActionCreators(TotalTeam, dispatch),
    getTotalPlayer: bindActionCreators(TotalPlayer, dispatch),
    getTotalUser: bindActionCreators(TotalUser, dispatch),
    getMatch: bindActionCreators(MatchAction, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);