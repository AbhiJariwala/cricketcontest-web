import React, { Component } from 'react';
import { ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Container, Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as matchPlayerScoreAction from '../../../action/matchPlayerScore';
import * as TournamentMatchAction from '../../../action/TournamentMatch';
import *  as TournamentPointAction from '../../../action/tournamentPoint'
import '../AddTournamentMatchPlayerScore/AddTournamentMatchPlayerScore.css'


// import { Table } from 'antd';


class AddMatchPlayerScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerScore: {},
            Runs: {},
            Six: {},
            Four: {},
            Wicket: {},
            Stumping: {},
            Catch: {}
        };
    }
    componentDidMount() {
        this.props.action.TournamentMatches.SelectTournamentMatchAction(0, 100, "desc", "id");
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(1, 100, "desc", "id");
        this.props.action.TournamentPoint.getTournamentPointScore(0,100,"id","desc");
    }

    tournamentNameChangedHandler(e) {
        let tournamentId = e.target.value;
        this.props.action.MatchPlayerScore.getMatchByTournament(tournamentId);
    }
    teamChangeHandler(tournamentId, e) {
        let teamId = e.target.value;
        this.props.action.MatchPlayerScore.getPlayers(tournamentId, teamId);
    }
    inputChangeHandler(playerId, e) {
        this.setState({
            playerScore: {
                ...this.state.playerScore,
                [playerId]:
                {
                    ...this.state.playerScore[playerId],
                    [e.target.name]: parseInt(e.target.value, 10)
                }
            }
        })

    }


    addTournamentMatchPlayerScore(tournament) {
        console.log(tournament);
        console.log(this.props.TournamentPoint.get_points);

        this.props.TournamentPoint.get_points.map(tournamentPoint=>{
            (tournamentPoint.tournamentId===tournament.id)?console.log(tournamentPoint):""
        })
        Object.entries(this.state.playerScore).map(([key, value]) => {
            console.log(value)
            let tempObj = {
                tournamentId: tournament.tournamentId,
                tournamentMatchId: tournament.id,
                playerId: parseInt(key, 10),
                wicket: value.wicket,
                run: value.runs,
                catch: value.catch,
                six: value.six,
                four: value.four,
                stumping: value.stumping,
            }
            console.log(tempObj);
            // this.props.action.getMatchPlayerScore.addTournamentMatchPlayerScore();
        })

        for (var i = 0; i < this.state.playerScore.length; i++) {
            console.log(this.state.playerScore[i]);
        }
        // this.props.action.getMatchPlayerScore.addTournamentMatchPlayerScore(this.state);
    }

    render() {
        let tournamentNameOption = {};
        if (this.props.TournamentMatches.allmatchs.length > 0) {
            tournamentNameOption = this.props.TournamentMatches.allmatchs.map((tournamentMatch) => {
                var d1 = new Date(tournamentMatch.matchDate);
                var d2 = new Date(new Date().toISOString());
                var dateDiff = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
                return (dateDiff === 1) ? tournamentMatch : null
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
            teams = <Input type="select" onChange={this.teamChangeHandler.bind(this, tournament[0].tournamentId)} >
                <option disabled defaultChecked>Select Team</option>
                <option value={team1.id}>{team1.teamName}</option>
                <option value={team2.id} >{team2.teamName}</option>
            </Input>
        }
        console.log(tournament[0])
        let player = "";
        if (this.props.MatchPlayerScore.players.length > 0) {
            player = this.props.MatchPlayerScore.players.map(player => {
                return player = player.Players.map((p) => {
                    return <tr key={p.id} >
                        <td><b>{p.firstName}</b></td>
                        <td style={{ paddingRight: "3px", paddingBottom: "3px" }}><Input type="text" name="runs" placeholder="Runs" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td style={{ paddingRight: "3px" }}><Input type="text" name="four" placeholder="Four" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td style={{ paddingRight: "3px" }}><Input type="text" name="six" placeholder="Six" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td style={{ paddingRight: "3px" }}><Input type="text" name="catch" placeholder="Catch" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td style={{ paddingRight: "3px" }}><Input type="text" name="stumping" placeholder="Stumping" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
                        <td style={{ paddingRight: "3px" }}><Input type="text" name="wicket" placeholder="Wicket" onChange={this.inputChangeHandler.bind(this, p.id)} /></td>
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
                            {(player) ?
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
        TournamentPoint:state.TournamentPoint
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch),
        TournamentMatches: bindActionCreators(TournamentMatchAction, dispatch),
        TournamentPoint:bindActionCreators(TournamentPointAction,dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMatchPlayerScore);