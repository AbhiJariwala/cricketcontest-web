import React, { Component } from 'react';
import { Table, Button, ButtonGroup } from 'reactstrap';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddPlayerScore from './addPlayerScore/addPlayerScore';
import { PanelHeader } from "components";

import * as matchPlayerScoreAction from '../../action/matchPlayerScore';

class MatchPlayerScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editData: null,
            offset: 0,
            perPageRecord: 5,
            orderByName: "id",
            orderBy: "desc"

        };
        this.toggle = this.toggle.bind(this);
        this.editData = this.editData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.perPage = this.perPage.bind(this);
        this.changeRecord = this.changeRecord.bind(this);
    }

    componentDidMount() {
        this.props.action.getMatchPlayerScore.getTournamentMatchPlayerScore(this.state.offset, this.state.perPageRecord, this.state.orderByName, this.state.orderBy);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
            editData: null
        });
    }

    perPage = (event) => {
        const perPage = parseInt(event.target.value, 10);
        this.setState({ perPageRecord: perPage })
        this.props.action.getMatchPlayerScore.getTournamentMatchPlayerScore(this.state.offset, perPage, this.state.orderByName, this.state.orderBy);
    }

    changeRecord = (event) => {
        let prevNext = event.target.value;
        let offset = 0;
        if (prevNext === "next") {
            this.setState({ offset: this.state.offset + 5 })
            if (this.state.offset === 0) {
                this.setState({ offset: this.state.perPageRecord })
                offset = this.state.perPageRecord
            } else {
                offset = this.state.offset + this.state.perPageRecord
            }
        }
        else if (prevNext === "prev") {
            this.setState({ offset: this.state.offset - this.state.perPageRecord })
            offset = this.state.offset - this.state.perPageRecord
        }
        this.props.action.getMatchPlayerScore.getTournamentMatchPlayerScore(offset, this.state.perPageRecord, this.state.orderByName, this.state.orderBy);
    }

    editData(data, tournamentName, matchName, playerName) {
        data = { ...data, tournamentName, matchName, playerName };        
        this.setState({
            modal: !this.state.modal,
            editData: data
        });
    }

    deleteData(data) {

    }

    getTournamentNameById(tournamentId) {
        let tournamentName = "";
        if (this.props.tournaments) {
            tournamentName = this.props.tournaments.map((tournament) => {
                return (
                    tournament.id === tournamentId ? tournament.tournamentName : undefined
                )
            })
        }
        return tournamentName;
    }

    getTournamentMatchNameById(tournamentId, tournamentMatchId) {
        let tournamentMatchName = "";
        if (this.props.tournaments) {
            tournamentMatchName = this.props.tournaments.map((tournament) => {
                return (
                    tournament.id === tournamentId ?
                        tournament.TournamentMatches.map(tournamentMatch => {
                            return (
                                tournamentMatch.id === tournamentMatchId ?
                                    tournamentMatch.Team1[0].teamName + " VS " + tournamentMatch.Team2[0].teamName :
                                    undefined
                            )
                        }) : undefined
                )
            })
        }
        return tournamentMatchName;
    }

    getTournamentMatchPlayerNameById(tournamentId, playerId) {
        let tournamentMatchPlayerName = "";
        if (this.props.tournaments) {
            tournamentMatchPlayerName = this.props.tournaments.map((tournament) => {
                return (
                    tournament.id === tournamentId ?
                        tournament.Teams.map(team => {
                            return (
                                team.player.map(player => {
                                    return (
                                        player.id === playerId ?
                                            player.firstName + " " + player.lastName :
                                            undefined
                                    )
                                })
                            )
                        }) : undefined
                )
            })
        }
        return tournamentMatchPlayerName;
    }

    render() {
        let total = 0;
        let tournamentMatchPlayerScore = "";
        if (this.props.scores) {
            tournamentMatchPlayerScore = this.props.scores.map((score, i) => {
                total = i + 1;
                return (
                    <tr key={score.id} style={{ textAlign: "center" }}>
                        <td>{this.getTournamentNameById(score.tournamentId)}</td>
                        <td>{this.getTournamentMatchNameById(score.tournamentId, score.tournamentMatchId)}</td>
                        <td>{this.getTournamentMatchPlayerNameById(score.tournamentId, score.playerId)}</td>
                        <td>{score.wicket}</td>
                        <td>{score.run}</td>
                        <td>{score.catch}</td>
                        <td>{score.six}</td>
                        <td>{score.four}</td>
                        <td>{score.stumping}</td>
                        <td>{score.score}</td>
                        <td>
                            <Button color="info" onClick={() => this.editData(score,
                                this.getTournamentNameById(score.tournamentId),
                                this.getTournamentMatchNameById(score.tournamentId, score.tournamentMatchId),
                                this.getTournamentMatchPlayerNameById(score.tournamentId, score.playerId)
                            )} style={{ width: "70px" }}>Edit</Button>
                            {'  '}
                            <Button color="danger" onClick={() => this.deleteData(score)} style={{ width: "70px" }}>Delete</Button>
                        </td>
                    </tr>
                )
            })
        }

        return (
            <div>
                <PanelHeader size="sm" />
                <div className="content">

                    <AddPlayerScore isOpen={this.state.modal} toggle={this.toggle} data={this.state.editData}></AddPlayerScore>

                    <div style={{ marginTop: "50px" }}>
                        <div style={{ float: "right" }}>
                            Show entries
                            <Input type="select" name="entries" id="exampleSelect" onChange={this.perPage}>
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input>
                        </div>
                        <div style={{ float: "left" }}>
                            <Button color="info" onClick={this.toggle} style={{ width: "70px" }}>Add</Button>
                        </div>
                    </div>

                    <Table responsive hover>
                        <thead className="thead-dark">
                            <tr style={{ textAlign: "center" }}>
                                <th>Tournament</th>
                                <th>Match</th>
                                <th>Player</th>
                                <th>Wicket</th>
                                <th>Run</th>
                                <th>Catch</th>
                                <th>Six</th>
                                <th>Four</th>
                                <th>Stumping</th>
                                <th>Score</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournamentMatchPlayerScore}
                        </tbody>
                    </Table>

                    <ButtonGroup>
                        {this.state.offset <= 0 ?
                            <Button color="info" onClick={this.changeRecord} value="prev" disabled>Prev</Button> :
                            <Button color="info" onClick={this.changeRecord} value="prev">Prev</Button>}
                        &nbsp;
                        {total >= this.state.perPageRecord ?
                            <Button color="info" onClick={this.changeRecord} value="next">Next</Button> :
                            <Button color="info" onClick={this.changeRecord} value="next" disabled>Next</Button>}
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    scores: state.MatchPlayerScore.scores,
    tournaments: state.MatchPlayerScore.tournaments
})

const mapDispatchToProps = dispatch => ({
    action: {
        getMatchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MatchPlayerScore);