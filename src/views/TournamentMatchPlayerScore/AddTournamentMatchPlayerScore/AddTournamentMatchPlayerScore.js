import React, { Component } from 'react';
import { ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as matchPlayerScoreAction from '../../../action/matchPlayerScore';
import * as TournamentMatchAction from '../../../action/TournamentMatch';
import *  as TournamentPointAction from '../../../action/tournamentPoint'
import './AddTournamentMatchPlayerScore.css'


// import { Table } from 'antd';


class AddMatchPlayerScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerScore: {},
            teamId: 0
        };
    }
    componentDidMount() {
        this.props.action.TournamentMatches.SelectTournamentMatchAction(0, 100, "desc", "id");
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(1, 100, "desc", "id");
        this.props.action.TournamentPoint.getTournamentPointScore(0, 100, "id", "desc");
    }
    tournamentNameChangedHandler(e) {
        let tournamentId = e.target.value;
        this.props.action.MatchPlayerScore.getMatchByTournament(tournamentId);
    }
    teamChangeHandler(tournamentId, e) {
        let teamId = e.target.value;
        this.setState({
            teamId: teamId
        })
        this.props.action.MatchPlayerScore.getPlayers(tournamentId, teamId);
    }
    inputChangeHandler(playerId, e) {
        this.setState({
            playerScore: {
                ...this.state.playerScore,
                [playerId]:
                {
                    ...this.state.playerScore[playerId],
                    [e.target.name]: parseInt(e.target.value, 10),
                    score: 0,
                    teamId: this.state
                }
            }
        })
    }

    addTournamentMatchPlayerScore(tournament) {
        Object.entries(this.state.playerScore).map(([key, value]) => {
            this.props.TournamentPoint.get_points.map(tournamentPoint => {
                if (tournamentPoint.tournamentId === tournament.tournamentId) {
                    Object.entries(tournamentPoint.pointJson).map(([pointType, pointValue]) => {
                        let from, to;
                        if (pointType === "Catch") {
                            for (var Cpv in pointValue) {
                                from = parseInt((pointValue[Cpv].from), 10);
                                to = parseInt((pointValue[Cpv].to), 10);
                                if (from <= value.catch && to >= value.catch) {
                                    value.score += parseInt(pointValue[Cpv].point, 10)
                                    break;
                                }
                            }
                        }
                        if (pointType === "Wicket") {
                            for (var Wpv in pointValue) {
                                from = parseInt((pointValue[Wpv].from), 10);
                                to = parseInt((pointValue[Wpv].to), 10);
                                if (from <= value.wicket && to >= value.wicket) {
                                    value.score += parseInt(pointValue[Wpv].point, 10)
                                    break;
                                }
                            }

                        }
                        if (pointType === "Runs") {
                            for (var Rpv in pointValue) {
                                from = parseInt((pointValue[Rpv].from), 10);
                                to = parseInt((pointValue[Rpv].to), 10);
                                if (from <= value.runs && to >= value.runs) {
                                    value.score += parseInt(pointValue[Rpv].point, 10)
                                    break;
                                }
                            }
                        }
                        if (pointType === "Stumping") {
                            for (var Spv in pointValue) {
                                from = parseInt((pointValue[Spv].from), 10);
                                to = parseInt((pointValue[Spv].to), 10);
                                if (from <= value.stumping && to >= value.stumping) {
                                    value.score += parseInt(pointValue[Spv].point, 10)
                                    break;
                                }
                            }
                        }
                        if (pointType === "Four") {
                            for (var Fpv in pointValue) {
                                from = parseInt((pointValue[Fpv].from), 10);
                                to = parseInt((pointValue[Fpv].to), 10);
                                if (from <= value.four && to >= value.four) {
                                    value.score += parseInt(pointValue[Fpv].point, 10)
                                    break;
                                }
                            }

                        }
                        if (pointType === "Six") {
                            for (var Sixpv in pointValue) {
                                from = parseInt((pointValue[Sixpv].from), 10);
                                to = parseInt((pointValue[Sixpv].to), 10);
                                if (from <= value.six && to >= value.six) {
                                    value.score += parseInt(pointValue[Sixpv].point, 10)
                                    break;
                                }
                            }
                        }
                        return ""
                    })
                }
                return ""
            })
            // let finalScore = {
            //     tournamentId: tournament.tournamentId,
            //     tournamentMatchId: tournament.id,
            //     playerId: parseInt(key, 10),
            //     wicket: value.wicket,
            //     run: value.runs,
            //     catch: value.catch,
            //     six: value.six,
            //     four: value.four,
            //     stumping: value.stumping,
            //     score: value.score
            // }
            // this.props.action.MatchPlayer Score.addTournamentMatchPlayerScore(finalScore);
            this.props.toggleAdd();
            return ""
        })
    }

    render() {
        let tournamentNameOption = {};
        if (this.props.TournamentMatches.allmatchs.length > 0) {
            tournamentNameOption = this.props.TournamentMatches.allmatchs.map((tournamentMatch) => {
                var d1 = new Date(tournamentMatch.matchDate);
                var d2 = new Date(new Date().toISOString());
                console.log(d1 < d2);
                // var dateDiff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
                // return (dateDiff === 1) ? tournamentMatch : null
                return null
            })
        }
        let tournament = []
        for (let i = 0; i < tournamentNameOption.length; i++) {
            if (tournamentNameOption[i] != null) {
                tournament[0] = tournamentNameOption[i];
            }
        }
        let tournamentName = "", team1 = "", team2 = "", teams = "";
        if (tournament[0]) {
            tournamentName = tournament[0].Tournament.tournamentName;
            team1 = tournament[0].Team1[0];
            team2 = tournament[0].Team2[0];
            teams = <Input type="select" id="selectTeam" onChange={this.teamChangeHandler.bind(this, tournament[0].tournamentId)} >
                <option value="" disabled="" style={{ display: "none" }}>Select Team</option>
                <option value={team1.id}>{team1.teamName}</option>
                <option value={team2.id} >{team2.teamName}</option>
            </Input>
        }
        let player = "";
        if (this.props.MatchPlayerScore.players.length > 0) {
            player = this.props.MatchPlayerScore.players.map(player => {
                return player = player.Players.map((p) => {
                    return <tr key={p.id} className="playerScore" >
                        <td><b>{p.firstName}</b></td>
                        <td><Input type="text" name="runs" placeholder="Runs" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td><Input type="text" name="four" placeholder="Four" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td><Input type="text" name="six" placeholder="Six" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td><Input type="text" name="catch" placeholder="Catch" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td><Input type="text" name="stumping" placeholder="Stumping" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td><Input type="text" name="wicket" placeholder="Wicket" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                    </tr>
                })
            })
        }

        return (
            // <Container>
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleAdd} >
                <ModalHeader toggle={this.props.toggleAdd} >
                    MatchPlayerScore
                </ModalHeader>
                <ModalBody >
                    <Form>
                        <FormGroup>
                            <h3 style={{ color: "#2CA8FF", textAlign: "center" }}>{' '}{tournamentName}</h3>
                        </FormGroup>
                        <FormGroup>
                            <h5 style={{ color: "#2CA8FF", textAlign: "center" }}>{' '}{team1.teamName + " VS " + team2.teamName}</h5>
                        </FormGroup>
                        <hr />
                        <FormGroup>
                            {teams}
                        </FormGroup>
                        <FormGroup>
                            {(player && document.getElementById("selectTeam")) ?
                                <table style={{ textAlign: "center" }}>
                                    <thead  >
                                        <tr>
                                            <th>Player</th>
                                            <th>Runs</th>
                                            <th>Four</th>
                                            <th>Six</th>
                                            <th>Catch</th>
                                            <th>Stumping</th>
                                            <th>Wicket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {player}
                                    </tbody>
                                </table> : ""
                            }
                        </FormGroup>
                    </Form>

                </ModalBody>

                <ModalFooter>
                    {/* {this.props.data ? */}
                    {/* <Button color="info" onClick={this.updateTournamentMatchPlayerScore}>Update</Button> : */}
                    <Button color="info" onClick={() => this.addTournamentMatchPlayerScore(tournament[0])}>Submit</Button>
                    <Button color="secondary" onClick={this.props.toggleAdd}>Cancel</Button>
                </ModalFooter>

            </Modal>
            // </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        MatchPlayerScore: state.MatchPlayerScore,
        TournamentMatches: state.TournamentMatchs,
        TournamentPoint: state.TournamentPoint
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch),
        TournamentMatches: bindActionCreators(TournamentMatchAction, dispatch),
        TournamentPoint: bindActionCreators(TournamentPointAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMatchPlayerScore);