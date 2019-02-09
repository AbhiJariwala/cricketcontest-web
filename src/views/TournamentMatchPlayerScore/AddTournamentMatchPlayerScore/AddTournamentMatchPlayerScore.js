import React, { Component } from 'react';
import { ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Container, Button, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as matchPlayerScoreAction from '../../../action/matchPlayerScore';
import * as TournamentMatchAction from '../../../action/TournamentMatch';

// import { Table } from 'antd';


class AddMatchPlayerScore extends Component {


    componentDidMount() {
        this.props.action.TournamentMatches.SelectTournamentMatchAction(0, 100, "desc", "id");
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(1, 100, "desc", "id");
    }

    tournamentNameChangedHandler(e) {
        let tournamentId = e.target.value;
        this.props.action.MatchPlayerScore.getMatchByTournament(tournamentId);
    }
    teamChangeHandler(tournamentId, e) {
        let teamId = e.target.value;
        this.props.action.MatchPlayerScore.getPlayers(tournamentId, teamId);
    }

    addTournamentMatchPlayerScore(e) {
        e.preventDefault();

        // this.props.action.getMatchPlayerScore.addTournamentMatchPlayerScore(this.state);
    }

    render() {
        console.log(this.props.MatchPlayerScore.players);
        let tournamentNameOption = {};
        if (this.props.TournamentMatches.allmatchs.length > 0) {
            tournamentNameOption = this.props.TournamentMatches.allmatchs.map((tournamentMatch) => {
                var d1 = new Date(tournamentMatch.matchDate);
                var d2 = new Date(new Date().toISOString());
                var dateDiff = Math.abs(Math.floor((d2 - d1) / (1000 * 60 * 60 * 24)));
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
                <option value={team1.id}>{team1.teamName}</option>
                <option value={team2.id} >{team2.teamName}</option>
            </Input>
        }
        let player = "";
        if (this.props.MatchPlayerScore.players.length > 0) {
            player = this.props.MatchPlayerScore.players.map(player => {
                return player = player.Players.map((p) => {
                    return <tr key={player.id}>
                        <td><b>{p.firstName}</b></td>
                        <td style={{ paddingRight: "5px" }}><Input type="text" name="six" placeholder="Runs" /></td>
                        <td><Input type="text" name="six" placeholder="Four" /></td>
                        <td><Input type="text" name="six" placeholder="Sixes" /></td>
                        <td><Input type="text" name="six" placeholder="Catch" /></td>
                        <td><Input type="text" name="six" placeholder="Stumping" /></td>
                        <td><Input type="text" name="six" placeholder="Wicket" /></td>
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
                        {/* <FormGroup>
                            <Label for="playerName">Select Player Name</Label>
                            <Input type="select" name="playerId" id="playerName"
                                // defaultValue={this.props.data ? this.props.data.tournamentMatchPlayerName : ""}
                                onChange={this.tournamentMatchPlayerNameChangedHandler}>
                                <option value="" disabled="" style={{ display: "none" }}>Select Player</option>
                                {tournamentMatchPlayers1}
                                {tournamentMatchPlayers2}
                            </Input>
                        </FormGroup> */}
                        {/* <FormGroup>
                                    <Label for="wicket">Wicket</Label>
                                    <Input type="select" name="wicket" id="wicket"
                                        defaultValue={this.props.data ? this.props.data.wicket : ""}
                                        onChange={this.changeHandler}>
                                        <option value="" disabled="" style={{ display: "none" }}>Select Wicket</option>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="run">Run</Label>
                                    <Input type="number" name="run" id="run" placeholder="Runs"
                                        defaultValue={this.props.data ? this.props.data.run : ""}
                                        onChange={this.changeHandler} />
                                    <span style={{ color: "red" }}></span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="catch">Catch</Label>
                                    <Input type="select" name="catch" id="catch"
                                        defaultValue={this.props.data ? this.props.data.catch : ""}
                                        onChange={this.changeHandler}>
                                        <option value="" disabled="" style={{ display: "none" }}>Select Catch</option>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="six">Six</Label>
                                    <Input type="number" name="six" id="six" placeholder="Sixes"
                                        defaultValue={this.props.data ? this.props.data.six : ""}
                                        onChange={this.changeHandler} />
                                    <span style={{ color: "red" }}></span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="four">Four</Label>
                                    <Input type="number" name="four" id="four" placeholder="Fours"
                                        defaultValue={this.props.data ? this.props.data.four : ""}
                                        onChange={this.changeHandler} />
                                    <span style={{ color: "red" }}></span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="stumping">Stumping</Label>
                                    <Input type="select" name="stumping" id="stumping"
                                        defaultValue={this.props.data ? this.props.data.stumping : ""}
                                        onChange={this.changeHandler}>
                                        <option value="" disabled="" style={{ display: "none" }}>Select Stumping</option>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                    </Input>
                                </FormGroup> */}

                    </Form>

                </ModalBody>

                <ModalFooter>
                    {/* {this.props.data ? */}
                    {/* <Button color="info" onClick={this.updateTournamentMatchPlayerScore}>Update</Button> : */}
                    <Button color="info" onClick={this.addTournamentMatchPlayerScore}>Submit</Button>
                    {/* <Button color="danger" onClick={this.props.toggle}>Cancel</Button> */}
                </ModalFooter>

            </Modal>
            // </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        MatchPlayerScore: state.MatchPlayerScore,
        TournamentMatches: state.TournamentMatchs
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch),
        TournamentMatches: bindActionCreators(TournamentMatchAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMatchPlayerScore);