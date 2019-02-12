import React, { Component } from 'react';
import UserPanel from '../../UserPanel/userPanel'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button } from 'reactstrap';
import classnames from 'classnames';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as  MatchPlayerScore from '../../../action/TournamentMatch'
import * as  CreateTeamAction from '../../../action/user/Createteam'
import {
    Card, CardBody
} from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import path from '../../../path';
import './createTeam.css'
let teamId = [];
const image = "https://wallpapersite.com/images/pages/pic_w/6005.jpg"
class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            Myteam: [],
            activeTab: '1',
            team1: 0,
            team2: 0
        };
    }
    componentDidMount = () => {
        this.getTournamentMatch();
    }
    getTournamentMatch() {
        this.props.action.MatchPlayerScore.SelectTournamentMatchAction(0, 100, "id", "desc");
    }
    addplayerteam = (teams, name) => {
        if (name === "team1") {
            this.setState({ team1: this.state.team1 + 1 })
        } else if (name === "team2") {
            this.setState({ team2: this.state.team2 + 1 })
        }
        if (this.state.Myteam.length !== 11) {
            teamId.push(teams.id);
            this.setState({ Myteam: teamId });
        } else {
            confirmAlert({
                message: 'you are already selected 11 players?.',
                buttons: [{
                    label: 'ok',
                }
                ]
            })
        }
    }
    minusplayerteam = (teams, name) => {
        if (name === "team1") {
            this.setState({ team1: this.state.team1 - 1 })
        } else if (name === "team2") {
            this.setState({ team2: this.state.team2 - 1 })
        }
        teamId.pop(teams.id);
        this.setState({ Myteam: teamId });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    createteam = (E) => {
        E.preventDefault();
        const userId = localStorage.getItem("userId");
        const tournamentMatchId = this.props.match.params.id;

        this.state.Myteam.map(data => {
            data = {
                userId,
                tournamentMatchId,
                playerId: data
            }
            this.props.action.CreateTeam.createTeam(data)
            return "";
        })

    }
    render() {
        let teamplayers = [];
        let teamName1 = [];
        let tournamentMatch = '', tournamentMatch2 = '', selectedPlayer = "";
        if (this.props.ShowTornamentmatches.length !== 0) {
            this.props.ShowTornamentmatches.map((tournamentmatch) => {
                if (parseInt(this.props.match.params.id, 10) === tournamentmatch.id) {
                    teamName1 = tournamentmatch;
                    tournamentMatch = tournamentmatch.Team1[0].player.map((data, key) => {
                        teamplayers.push(data.id);
                        return (
                            // <Container key={key} >
                            <Card key={key} body>
                                <div className="row">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 " style={{ width: "100%" }}>
                                        <img alt="demo" src={path + data.playerImage} style={{width: "150px" }} ></img>
                                    </div>
                                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                                        <p>{data.firstName}{data.lastName}</p>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        {(this.state.Myteam.length > 0 && this.state.Myteam.includes(data.id)) ?
                                            <img alt="" onClick={() => this.minusplayerteam(data, "team1")} style={{ width: 45, cursor: "pointer" }} src={path + "minus.png"}></img>
                                            : <img alt="" onClick={() => this.addplayerteam(data, "team1")} style={{ width: 45, cursor: "pointer" }} src={path + "plus.png"}></img>
                                        }
                                    </div>
                                </div>
                            </Card>
                            // </Container>
                        )
                    })
                    tournamentMatch2 = tournamentmatch.Team2[0].player.map((data, key) => {
                        return (
                            // <Container key={key}>
                            <Card key={key} body>
                                <div className="row">
                                    <div className="col-sm-2" style={{ width: "100%" }}>
                                        <img alt="demo" src={path + data.playerImage} style={{  width: "150px" }}></img>
                                    </div>
                                    <div className="col-sm-7">
                                        <p>{data.firstName}{' '}{data.lastName}</p>
                                    </div>
                                    <div className="col-sm-3">
                                        {(this.state.Myteam.length > 0 && this.state.Myteam.includes(data.id)) ?
                                            <img alt="" onClick={() => this.minusplayerteam(data, "team2")} style={{ width: 45 }} src={path + "minus.png"}></img>
                                            : <img alt="" onClick={() => this.addplayerteam(data, "team2")} style={{ width: 45 }} src={path + "plus.png"}></img>
                                        }
                                    </div>
                                </div>
                            </Card>
                            // {/* </Container> */}
                        )
                    })
                    let teams = "";
                    let t1 = tournamentmatch.Team1[0].player;
                    let t2 = tournamentmatch.Team2[0].player;
                    teams = t1.concat(t2);

                    selectedPlayer = teams.map((data, key) => {
                        if (this.state.Myteam.length > 0 && this.state.Myteam.includes(data.id)) {
                            return <Col md={4}>
                                <Card style={{ height: "200px" }}>
                                    <CardBody>
                                        <img alt="Cricket Contest" src={path + data.playerImage} height="100px" width="100px" ></img>
                                        <p>{data.firstName}{' '}{data.lastName}</p>
                                        <p style={{ marginTop: "-15px" }}>{data.description}</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        }
                        return "";
                    })
                }
                return 0
            })
        } else {
            tournamentMatch = "No Data"
            tournamentMatch2 = "No Data"
        }

        if (teamName1.length !== 0) {
        }
        return (
            <div>
                <UserPanel></UserPanel>
                <div className="container" style={{ backgroundRepeat: "no-repeat", backgroundImage: `url(${image})`, overflow: "scroll", height: "600px",marginTop:"-17px"}}  >
                    <div className="row">
                        <div className="col-md-6" style={{}}>
                            <Row>
                                {selectedPlayer}
                            </Row>
                        </div>
                        <div className="col-sm-6" >
                            <Card style={{ background: "linear-gradient(104deg, #3c3c3c 47%, #323232" }}>
                                <CardBody >
                                    <div className="row" style={{ color: "white" }} >
                                        <div className="headerContainer_1725f headerFixed_38df7">
                                            <div>
                                                <div>
                                                    <div className="container_aa549">
                                                        <div className="maxInfoText_13e5b">Max select 11 players from Both team</div>
                                                        <div className="infoContent_0b612">
                                                            <div className="playerSelectionContainer_d8646">
                                                                <div>Players</div>
                                                                <div className="squadTextContainer_3e550">
                                                                    <div className="selectedCount_daee8">{this.state.Myteam.length}</div>
                                                                    <div className="totalCount_c1f66">/11</div>
                                                                </div>
                                                            </div>
                                                            <div className="flagContainer_029e0">
                                                                <div className="flagContainer_47acd"><img  alt="true" src={teamName1.length !== 0 ? path + teamName1.Team1[0].teamLogo : ""} className="flag_008b5" /></div>
                                                                <div className="squadOneText_3ad2c">
                                                                    <div className="teamName_a2024">{teamName1.length !== 0 ? teamName1.Team1[0].teamName : ""}</div>
                                                                    <div className="teamCount_84ce0">{this.state.team1}</div>
                                                                </div>
                                                            </div>
                                                            <div className="flagContainer_029e0">
                                                                <div className="squadTwoText_b9766">
                                                                    <div className="teamName_a2024">{teamName1.length !== 0 ? teamName1.Team2[0].teamName : ""}</div>
                                                                    <div className="teamCount_84ce0">{this.state.team2}</div>
                                                                </div>
                                                                <div className="flagContainer_47acd"><img  alt="true" src={teamName1.length !== 0 ? path + teamName1.Team2[0].teamLogo : ""} className="flag_008b5" /></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ background: "white" }}><Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}>
                                                {teamName1.length !== 0 ? teamName1.Team1[0].teamName : ""}
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}>
                                                {teamName1.length !== 0 ? teamName1.Team2[0].teamName : ""}
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                       
                                        <TabContent activeTab={this.state.activeTab} >
                                            <TabPane tabId="1">
                                                <Row   >
                                                    <Col sm="12">
                                                        <Col sm="12">
                                                            {tournamentMatch}
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="2">
                                                <Row>
                                                    <Col sm="12">
                                                        <Col sm="12">
                                                            {tournamentMatch2}
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent></div>
                                    <div style={{ float: "right" }}>
                                        {this.state.Myteam.length === 11 ?
                                            <Button onClick={this.createteam.bind(Event)} >Continue</Button>
                                            : <Button disabled>Continue</Button>}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ShowTornamentmatches: state.TournamentMatchs.allmatchs
    }
};
const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
        CreateTeam: bindActionCreators(CreateTeamAction, dispatch),


    }
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);