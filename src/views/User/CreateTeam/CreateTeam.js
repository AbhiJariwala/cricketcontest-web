import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Button, Card, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { confirmAlert } from 'react-confirm-alert';

import * as TournamentAction from '../../../action/Tournament';
import * as  CreateTeamAction from '../../../action/user/Createteam';
import UserPanel from '../../UserPanel/userPanel';
import path from '../../../path';
import './createTeam.css';

let teamId = [];
let urlImage = path + "UserSideBackgroundImage.jpg";

class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Myteam: [],
            width: window.innerWidth
        };
    }

    componentWillMount() {
        this.props.action.Tournament.FetchSingleTournamentAction(this.props.match.params.id);
    }

    addplayerteam = (playerId) => {
        if (this.state.Myteam.length !== 11) {
            teamId.push(playerId);
            this.setState({ Myteam: teamId });
        }
        else {
            confirmAlert({
                message: 'You have already selected 11 players.',
                buttons: [{ label: 'Ok' }]
            })
        }
    }

    minusplayerteam = (playerId) => {
        teamId.splice(teamId.indexOf(parseInt(teamId.filter(teamid => playerId === teamid), 10)), 1);
        this.setState({ Myteam: teamId });
    }

    createteam = (E) => {
        E.preventDefault();
        const userId = localStorage.getItem("userId");
        const tournamentId = this.props.match.params.id;
        this.state.Myteam.map(data => {
            data = {
                userId,
                tournamentId,
                playerId: data,
                createdBy: parseInt(userId, 10)
            }
            this.props.action.CreateTeam.createTeam(data)
            return "";
        })
        this.props.history.push('/Myteam');
    }

    render() {
        let selectedTournamentBanner = "";
        if (this.props.SelectedTournament[0]) {
            selectedTournamentBanner = this.props.SelectedTournament[0].tournamentBanner;
        }
        else {
            selectedTournamentBanner = "defaultTournament.png";
        }
        let tournamentPlayers = '', selectedPlayer = "";
        if (this.props.SelectedTournament[0]) {
            tournamentPlayers = this.props.SelectedTournament[0].Teams.map(team => {
                return (
                    team.player.map(player => {
                        return (
                            <Card key={player.id} body style={{ borderRadius: "10px" }}>
                                <div className="row" style={{ textAlign: "center" }}>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">
                                        <img alt="demo" src={path + "thumbnail/" + player.playerImage} style={{ width: "150px" }} ></img>
                                    </div>
                                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7" style={{ margin: "auto", float: "center" }}>
                                        <p>{player.firstName + " " + player.lastName}</p>
                                    </div>
                                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                        {(this.state.Myteam.length > 0 && this.state.Myteam.includes(player.id)) ?
                                            <img alt="" onClick={() => this.minusplayerteam(player.id)} style={{ width: 45, cursor: "pointer" }} src={path + "minus.png"}></img>
                                            : <img alt="" onClick={() => this.addplayerteam(player.id)} style={{ width: 45, cursor: "pointer" }} src={path + "plus.png"}></img>
                                        }
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                )
            });
        }
        if (this.props.SelectedTournament[0]) {
            selectedPlayer = this.props.SelectedTournament[0].Teams.map(team => {
                return (
                    team.player.map(player => {
                        if (this.state.Myteam.length > 0 && this.state.Myteam.includes(player.id)) {
                            return (
                                <Col md={4} key={player.id}>
                                    <Card style={{ height: "180px", textAlign: "center" }}>
                                        <CardBody>
                                            <img alt="Cricket Contest" src={path + "thumbnail/" + player.playerImage} height="100px" width="100px" ></img>
                                            <p>{player.firstName + " " + player.lastName}</p>
                                            <p style={{ marginTop: "-15px" }}>{player.description}</p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        }
                        return null
                    })
                )
            });
        }

        return (
            <div style={{ backgroundImage: `url(${urlImage})`, backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", height: "100vh", backgroundSize: 'cover', paddingTop: '62px' }}>
                <UserPanel></UserPanel>
                <div className="container" style={{ overflow: 'auto', height: 'calc(100vh - 62px)' }}>
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
                                                        <div className="maxInfoText_13e5b" style={{ fontSize: "20px" }}>You can Select Maximum 11 players from below List</div>
                                                        <div className="infoContent_0b612">
                                                            <div>
                                                                <div style={{ display: "inline-block" }}>
                                                                    <img className="card-img" src={path + "thumbnail/" + selectedTournamentBanner} alt="true" />
                                                                </div>
                                                            </div>
                                                            <div >
                                                                <div style={{ fontSize: "20px" }}>Players</div>
                                                                <div style={{ fontSize: "20px", marginLeft: "14px" }}>{this.state.Myteam.length + "/11"}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ background: "#e6e6e6" }}>
                                        <Nav tabs>
                                            <NavItem>
                                                <NavLink>Players</NavLink>
                                            </NavItem>
                                        </Nav>
                                        <TabContent activeTab="1" >
                                            <TabPane tabId="1">
                                                <Row>
                                                    <Col sm="12">
                                                        <Col sm="12">
                                                            {tournamentPlayers}
                                                        </Col>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                    <div style={{ float: "right" }}>
                                        {this.state.Myteam.length === 11 ?
                                            <Button onClick={this.createteam.bind(Event)} >Create Team</Button>
                                            : <Button disabled>Create Team</Button>}
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
        SelectedTournament: state.Tournament.FetchSingleTournamentData,
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        Tournament: bindActionCreators(TournamentAction, dispatch),
        CreateTeam: bindActionCreators(CreateTeamAction, dispatch),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTeam);