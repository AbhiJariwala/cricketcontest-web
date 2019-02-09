import React, { Component } from 'react';
import {  ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as matchPlayerScoreAction from '../../../action/matchPlayerScore';
import * as TournamentAction from '../../../action/Tournament';
import * as  MatchPlayerScore from '../../../action/matchPlayerScore'
// import { Table } from 'antd';


class AddMatchPlayerScore extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         tournamentId: 0,
    //         tournamentMatchId: 0,
    //         playerId: 0,
    //         wicket: 0,
    //         run: 0,
    //         catch: 0,
    //         six: 0,
    //         four: 0,
    //         stumping: 0,
    //         score: 0,
    //         tournamentName: "",
    //         tournamentMatchName: "",
    //         tournamentMatchPlayerName: ""
    //     };
    //     this.tournamentNameChangedHandler = this.tournamentNameChangedHandler.bind(this);
    //     this.tournamentMatchNameChangedHandler = this.tournamentMatchNameChangedHandler.bind(this);
    //     this.addTournamentMatchPlayerScore = this.addTournamentMatchPlayerScore.bind(this);
    //     // this.updateTournamentMatchPlayerScore = this.updateTournamentMatchPlayerScore.bind(this);
    //     this.tournamentMatchPlayerNameChangedHandler = this.tournamentMatchPlayerNameChangedHandler.bind(this);
    //     this.changeHandler = this.changeHandler.bind(this);
    // }

    componentDidMount() {
        this.props.action.Tournament.SelectTournamentAction(1, 100, "desc", "id");
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(1, 100, "desc", "id");
    }

    tournamentNameChangedHandler(e) {
        this.setState({ tournamentName: e.target.options[e.target.selectedIndex].text });
        this.props.action.getMatchPlayerScore.getTournamentMatchesByTournamentId(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    // tournamentMatchNameChangedHandler(e) {
    //     this.setState({ tournamentMatchName: e.target.options[e.target.selectedIndex].text });
    //     this.props.action.getMatchPlayerScore.getplayersByTournamentMatchId(e.target.value);
    //     this.setState({ [e.target.name]: e.target.value });
    // }

    // tournamentMatchPlayerNameChangedHandler(e) {
    //     this.setState({ tournamentMatchPlayerName: e.target.options[e.target.selectedIndex].text });
    //     this.setState({ [e.target.name]: e.target.value });
    // }

    // changeHandler(e) {
    //     this.setState({ [e.target.name]: e.target.value });
    // }

    addTournamentMatchPlayerScore(e) {
        e.preventDefault();
        this.props.action.getMatchPlayerScore.addTournamentMatchPlayerScore(this.state);
        // this.props.toggle();
    }

    render() {
        let tournament1 = [];
        let tournament2 = [];
        let tournamentNameOption = [];
        let matchPlayerScore = [].concat(this.props.MatchPlayerScore);
        let tournaments = [].concat(this.props.ShowTournament);
        if (matchPlayerScore) {
            matchPlayerScore.map(tournament => {
                return tournament1.push(tournament.tournamentId);
            })
        }
        tournament2 = tournaments.filter(t => !tournament1.includes(t.id));
        if (tournament2) {
            tournamentNameOption = tournament2.map((t1) => {
                return <option key={t1.id} value={t1.id}>{t1.tournamentName}</option>
            })
        }
        // let tournamentMatchesNameOption = "";
        // if (this.props.teams.TournamentMatches) {
        //     tournamentMatchesNameOption = this.props.teams.TournamentMatches.map((tournamentMatch) => {
        //         return (<option key={tournamentMatch.id} value={tournamentMatch.id}>{tournamentMatch.Team1[0].teamName + " VS " + tournamentMatch.Team2[0].teamName}</option>)
        //     })
        // }

        // let tournamentMatchPlayers1 = "", tournamentMatchPlayers2 = "";
        // if (this.props.players.Team1 && this.props.players.Team2) {
        //     tournamentMatchPlayers1 = this.props.players.Team1[0].player.map((player) => {
        //         return (<option key={player.id} value={player.id}>{player.firstName + " " + player.lastName}</option>)
        //     });
        //     tournamentMatchPlayers2 = this.props.players.Team2[0].player.map((player) => {
        //         return (<option key={player.id} value={player.id}>{player.firstName + " " + player.lastName}</option>)
        //     });
        // }

        return (
            // <Container>
            // {/* <div style={{ float: "right", margin: "15px" }}> */}
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleAdd} >
                <ModalHeader toggle={this.props.toggleAdd} >
                    MatchPlayerScore
                        {/* {this.props.data ? " Update Match Player Score" : "Match Player Score"} */}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="tournamentName">Select Tournament Name</Label>
                            <Input
                                type="select"
                                name="tournamentId"
                                id="tournamentName"
                                // defaultValue={this.props.data ? this.props.data.tournamentName : ""}
                                onChange={this.tournamentNameChangedHandler}>
                                <option value="" style={{ display: "none" }}>Select Tournament</option>
                                {tournamentNameOption}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <table width="100%">
                                <thead>
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
                                    <tr>
                                        <td>abc</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FormGroup>

                        {/* <FormGroup>
                            <Label for="tournamentMatchName">Select Tournament Match Name</Label>
                            <Input
                                type="select"
                                name="tournamentMatchId"
                                id="tournamentMatchName"
                                // defaultValue={this.props.data ? this.props.data.tournamentMatchName : ""}
                                onChange={this.tournamentMatchNameChangedHandler}>
                                <option value="" disabled="" style={{ display: "none" }}>Select Tournament Match</option>
                                {tournamentMatchesNameOption}
                            </Input>
                        </FormGroup> */}
                        <hr />
                        {/* <FormGroup>
                            <Table>
                                <thead>
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
                                    <tr>
                                        <td>abc</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </FormGroup> */}
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
                    {/* {this.props.data ?
                                <Button color="info" onClick={this.updateTournamentMatchPlayerScore}>Update</Button> :
                                <Button color="info" onClick={this.addTournamentMatchPlayerScore}>Submit</Button>}
                            <Button color="danger" onClick={this.props.toggle}>Cancel</Button> */}
                </ModalFooter>

            </Modal>
            // {/* </div> */}
            // </Container>
        );
    }
}

const mapStateToProps = state => {
    // tournaments: state.MatchPlayerScore.tournaments,
    // teams: state.MatchPlayerScore.teams,
    // players: state.MatchPlayerScore.players,
    // scores: state.MatchPlayerScore.scores
    return {
        ShowTournament: state.Tournament.TournamentData,
        MatchPlayerScore: state.MatchPlayerScore.tournamentMatchPlayerScore,
        TournamentMatch:state.TournamentMatchs.allmatchs
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        getMatchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch),
        Tournament: bindActionCreators(TournamentAction, dispatch),
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMatchPlayerScore);