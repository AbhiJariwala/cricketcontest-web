import React, { Component } from 'react';
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as matchPlayerScoreAction from '../../../action/matchPlayerScore';


class AddPlayerScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournamentId: 0,
            tournamentMatchId: 0,
            playerId: 0,
            wicket: 0,
            run: 0,
            catch: 0,
            six: 0,
            four: 0,
            stumping: 0,
            score: 0
        };
        this.tournamentNameChangedHandler = this.tournamentNameChangedHandler.bind(this);
        this.tournamentMatchNameChangedHandler = this.tournamentMatchNameChangedHandler.bind(this);
        this.addTournamentMatchPlayerScore = this.addTournamentMatchPlayerScore.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        this.props.action.getMatchPlayerScore.getTournaments();
    }

    tournamentNameChangedHandler(e) {
        this.props.action.getMatchPlayerScore.getTournamentMatchesByTournamentId(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    tournamentMatchNameChangedHandler(e) {
        this.props.action.getMatchPlayerScore.getplayersByTournamentMatchId(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    addTournamentMatchPlayerScore(e) {
        e.preventDefault();
        this.props.action.getMatchPlayerScore.addTournamentMatchPlayerScore(this.state);
        this.props.toggle();
    }

    changeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        let tournamentNameOption = "";
        if (this.props.tournaments) {
            tournamentNameOption = this.props.tournaments.map((tournament) => {
                return (<option key={tournament.id} value={tournament.id}>{tournament.tournamentName}</option>)
            })
        }

        let tournamentMatchesNameOption = "";
        if (this.props.teams.TournamentMatches) {
            tournamentMatchesNameOption = this.props.teams.TournamentMatches.map((tournamentMatch) => {
                return (<option key={tournamentMatch.id} value={tournamentMatch.id}>{tournamentMatch.Team1[0].teamName + " VS " + tournamentMatch.Team2[0].teamName}</option>)
            })
        }

        let tournamentMatchPlayers1 = "", tournamentMatchPlayers2 = "";;
        if (this.props.players.Team1 && this.props.players.Team2) {
            tournamentMatchPlayers1 = this.props.players.Team1[0].player.map((player) => {
                return (<option key={player.id} value={player.id}>{player.firstName + " " + player.lastName}</option>)
            });
            tournamentMatchPlayers2 = this.props.players.Team2[0].player.map((player) => {
                return (<option key={player.id} value={player.id}>{player.firstName + " " + player.lastName}</option>)
            });
        }

        return (
            <Container>
                <div style={{ float: "right", margin: "15px" }}>
                    <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >

                        <ModalHeader toggle={this.props.toggle} >{this.props.dataid ? " Update Match Player Score" : "Match Player Score"} </ModalHeader>

                        <ModalBody>

                            <Form>
                                <FormGroup>
                                    <Label for="tournamentName">Select Tournament Name</Label>
                                    <Input
                                        type="select"
                                        name="tournamentId"
                                        id="tournamentName"
                                        onChange={this.tournamentNameChangedHandler}>
                                        <option value="" disabled="" selected="" style={{ display: "none" }}>Select Tournament</option>
                                        {tournamentNameOption}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="tournamentMatchName">Select Tournament Match Name</Label>
                                    <Input
                                        type="select"
                                        name="tournamentMatchId"
                                        id="tournamentMatchName"
                                        onChange={this.tournamentMatchNameChangedHandler}>
                                        <option value="" disabled="" selected="" style={{ display: "none" }}>Select Tournament Match</option>
                                        {tournamentMatchesNameOption}
                                    </Input>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="playerName">Select Player Name</Label>
                                    <Input type="select" name="playerId" id="playerName" onChange={this.changeHandler}>
                                        <option value="" disabled="" selected="" style={{ display: "none" }}>Select Player</option>
                                        {tournamentMatchPlayers1}
                                        {tournamentMatchPlayers2}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="wicket">Wicket</Label>
                                    <Input type="select" name="wicket" id="wicket" onChange={this.changeHandler}>
                                        <option value="" disabled="" selected="" style={{ display: "none" }}>Select Wicket</option>
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
                                    <Input type="number" name="run" id="run" placeholder="Runs" onChange={this.changeHandler} />
                                    <span style={{ color: "red" }}></span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="catch">Catch</Label>
                                    <Input type="select" name="catch" id="catch" onChange={this.changeHandler}>
                                        <option value="" disabled="" selected="" style={{ display: "none" }}>Select Catch</option>
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
                                    <Input type="number" name="six" id="six" placeholder="Sixes" onChange={this.changeHandler} />
                                    <span style={{ color: "red" }}></span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="four">Four</Label>
                                    <Input type="number" name="four" id="four" placeholder="Fours" onChange={this.changeHandler} />
                                    <span style={{ color: "red" }}></span>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="stumping">Stumping</Label>
                                    <Input type="select" name="stumping" id="stumping" onChange={this.changeHandler}>
                                        <option value="" disabled="" selected="" style={{ display: "none" }}>Select Stumping</option>
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

                            </Form>

                        </ModalBody>

                        <ModalFooter>

                            {this.props.dataid ?
                                <Button color="info" >Update</Button> :
                                <Button color="info" onClick={this.addTournamentMatchPlayerScore}>Submit</Button>}
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>

                        </ModalFooter>

                    </Modal>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    tournaments: state.MatchPlayerScore.tournaments,
    teams: state.MatchPlayerScore.teams,
    players: state.MatchPlayerScore.players
})

const mapDispatchToProps = dispatch => ({
    action: {
        getMatchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayerScore);