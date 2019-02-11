import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { Modal as AntModal, Collapse } from 'antd';
import 'antd/dist/antd.css';

import * as  MatchPlayerScore from '../../action/matchPlayerScore'
import { PanelHeader } from "components";
import * as TournamentMatch from '../../action/TournamentMatch'
import AddMatchPlayerScore from './AddTournamentMatchPlayerScore/AddTournamentMatchPlayerScore'

import './TournamentMatchPlayer.css'

const Panel = Collapse.Panel;

class TournamenMatchPlayerScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showModal: false,
            matchPlayerScore: [],
            playes: [],
            teamName: "",
            score: []
        };
        this.toggleMatchPlayerScore = this.toggleMatchPlayerScore.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    componentDidMount() {
        this.getTournamentMatch();
        this.getMatchPlayerScore(0, 100, "id", "DESC");
    }
    getTournamentMatch() {
        this.props.action.TournamentMatches.SelectTournamentMatchAction(0, 100, "id", "desc");
    }
    getMatchPlayerScore(offset, perPageRecord, fieldName, order) {
        this.props.action.MatchPlayerScore.getTournamentMatchPlayerScore(offset, perPageRecord, fieldName, order);
    }
    toggleMatchPlayerScore() {
        this.setState({
            visible: !this.state.visible
        });
    }
    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }
    btnAddClick() {
        this.toggleModal();
    }
    getTournamentMatchPlayerScoreByMatch(tournamentId, teamId) {
        this.props.action.MatchPlayerScore.getPlayers(tournamentId, teamId);
        console.log(this.state.players)
        this.setState({
            visible: true
        })
    }
    CollapsePlayerHandler(playerId) {
        let Score = "";
        if (this.props.MatchPlayerScore.tournamentMatchPlayerScore) {
            this.props.MatchPlayerScore.tournamentMatchPlayerScore.map(score => {
                return (score.playerId === playerId) ? Score = score : Score = []
            })
        }
        this.setState({ score: [].concat(Score) });
    }

    render() {
        let tournamentMatch = '';
        let start = 0;

        const { score } = this.state;
        if (this.props.TournamentMatches.allmatchs.length > 0) {
            start = 1;
            tournamentMatch = this.props.TournamentMatches.allmatchs.map((tournamentmatch, key) => {
                return <tr key={key} style={{ textAlign: "center" }} >
                    <td>{start++}</td>
                    <td>{tournamentmatch.Tournament.tournamentName}</td>
                    <td>
                        <Button style={{ width: "150px", float: "right" }} color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.Team1[0].id)} name="team1" >
                            {tournamentmatch.Team1[0].teamName}
                        </Button>
                    </td>
                    <td>
                        <b>VS</b>
                    </td>
                    <td>
                        <Button style={{ width: "150px", float: "left" }} color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.Team2[0].id)} name="team2" >
                            {tournamentmatch.Team2[0].teamName}
                        </Button>
                    </td>
                    <td><Button color="info" style={{ width: "62px" }} >Edit</Button>&nbsp;
                <Button color="danger" >Delete</Button></td>
                </tr>
            })
        }
        else {
            tournamentMatch = "";
        }
        return (
            <div>
                <PanelHeader size="sm" />
                <div style={{ marginLeft: "15px" }}>
                    <AntModal title="Players"
                        visible={this.state.visible}
                        onCancel={this.toggleMatchPlayerScore}
                        footer={null}>
                        {(this.props.players) ?
                            this.props.players.map((player) => {
                                return (player.Players.map((p) => {
                                    return (<Collapse accordion key={p.id} onChange={this.CollapsePlayerHandler.bind(this, p.id)}>
                                        <Panel header={p.firstName} key={p.id}>
                                            {(score.length > 0) ? score.map((data, i) => {
                                                return <ul key={i} style={{ listStyle: "none" }}>
                                                    <li><b>Runs : </b>{data.run}</li>
                                                    <li><b>Six : </b>{data.six}</li>
                                                    <li><b>Four : </b>{data.four}</li>
                                                    <li><b>Catch : </b>{data.catch}</li>
                                                    <li><b>Stumping: </b>{data.stumping}</li>
                                                    <li><b>Wicket : </b>{data.wicket}</li>
                                                    <li className="score"><b><i>Score: </i></b>{data.wicket}</li>
                                                </ul>
                                            }) : <p>Player score not available</p>}
                                        </Panel>
                                    </Collapse>)
                                }))
                            }) : null
                        }
                    </AntModal>
                    <div style={{ marginTop: "50px" }}>
                        <div style={{ float: "right" }}>
                            Show entries
                           <Input type="select" name="select" >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Input>
                        </div>
                        <div style={{ float: "left" }}>
                            <Button color="info" style={{ width: "100%" }} onClick={this.btnAddClick.bind(this)} >Add</Button>                            
                                <AddMatchPlayerScore isOpen={this.state.showModal} toggleAdd={this.btnAddClick.bind(this)} />                            
                        </div>
                    </div>

                    <Table hover>
                        <thead className="thead-dark">
                            <tr style={{ textAlign: "center" }}>
                                <th>#</th>
                                <th style={{ cursor: "pointer" }}>Tournament</th>
                                <th style={{ cursor: "pointer" }} colSpan="3">Match</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(tournamentMatch !== "") ? tournamentMatch
                                : <tr><th>Tournament match is not available</th></tr>
                            }
                        </tbody>
                    </Table>
                    <ButtonGroup>
                        <Button color="info" name="Prev">Prev</Button> &nbsp;
                        <Button color="info" name="Next">Next</Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        MatchPlayerScore: state.MatchPlayerScore,
        TournamentMatches: state.TournamentMatchs,
        players: state.MatchPlayerScore.players
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        MatchPlayerScore: bindActionCreators(MatchPlayerScore, dispatch),
        TournamentMatches: bindActionCreators(TournamentMatch, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamenMatchPlayerScore);