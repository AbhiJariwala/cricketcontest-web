import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { Modal, Collapse } from 'antd';

import * as  MatchPlayerScore from '../../action/matchPlayerScore'
import { PanelHeader } from "components";
import * as TournamentMatch from '../../action/TournamentMatch'
// import ShowMatchPlayerScore from '../TournamentMatchPlayerScore/ShowMatchPlayerScore'
// import  './TournamenMatchPlayerScore.css'

import 'antd/dist/antd.css';
const Panel = Collapse.Panel;

class TournamenMatchPlayerScore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            matchPlayerScore: [],
            teamName: "",
            score: []
        };
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
    toggleMatchPlayerScore = () => {
        this.setState({
            visible: !this.state.visible
        });
    }

    getTournamentMatchPlayerScoreByMatch(tournamentId, teamId) {
        this.props.action.MatchPlayerScore.getPlayers(tournamentId, teamId);
        this.setState({
            visible: true
        })
    }

    CollapsePlayerHandler(playerId) {
        // console.log(playerId);        
        let Score = "";
        if (this.props.MatchPlayerScore.tournamentMatchPlayerScore) {
            this.props.MatchPlayerScore.tournamentMatchPlayerScore.map(score => {
                return (score.playerId === playerId) ? Score = score : Score = null
            })
        }
        this.setState({ score: [].concat(Score) });

    }

    render() {
        let tournamentMatch = '';
        let start = 0;

        const { score } = this.state;

        if (this.props.TournamentMatches.tournamentmatchs) {
            start = 0;
            tournamentMatch = this.props.TournamentMatches.tournamentmatchs.map((tournamentmatch, key) => {
                return <tr key={key} style={{ textAlign: "center" }} >
                    <td>{start++}</td>
                    <td>{tournamentmatch.Tournament.tournamentName}</td>
                    <td style={{ float: "right" }}>
                        <Button color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.Team1[0].id)} name="team1" >
                            {tournamentmatch.Team1[0].teamName}
                        </Button>
                    </td>
                    <td>
                        <b>VS</b>
                    </td>
                    <td style={{ float: "left" }}>
                        <Button color="info" onClick={() => this.getTournamentMatchPlayerScoreByMatch(tournamentmatch.tournamentId, tournamentmatch.Team2[0].id)} name="team2" >
                            {tournamentmatch.Team2[0].teamName}
                        </Button>
                    </td>
                    <td><Button color="info" style={{ width: "62px" }} >Edit</Button>&nbsp;
                <Button color="danger" >Delete</Button></td>
                </tr>
            })
        }
        else {
            return <tr>No Match Found</tr>
        }
        return (
            <div>
                <PanelHeader size="sm" />
                <div style={{ marginLeft: "15px" }}>
                    {/* <AddPlayer isOpen={this.state.modal} toggle={this.btnAddClick.bind(this)} data={this.state}> </AddPlayer> */}
                    <Modal title="Players"
                        visible={this.state.visible}
                        onCancel={this.toggleMatchPlayerScore}
                        footer={null}>
                        {(this.props.players) ?
                            this.props.players.map((player) => {
                                return (player.Players.map((p) => {
                                    return (<Collapse accordion key={p.id} onChange={this.CollapsePlayerHandler.bind(this, p.id)}>
                                        <Panel header={p.firstName} key={p.id}>
                                            {(score) ? score.map(data => {
                                                return <ul key={data.id}>
                                                    <li><b>Runs : </b>{data.run}</li>
                                                    <li><b>Six : </b>{data.six}</li>
                                                    <li><b>Four : </b>{data.four}</li>
                                                    <li><b>Catch : </b>{data.catch}</li>
                                                    <li><b>Stumping: </b>{data.stumping}</li>
                                                    <li><b>Wicket : </b>{data.wicket}</li>
                                                    <li style={{ color: "red" }}><b><i>Your Score: </i></b>{data.wicket}</li>
                                                </ul>
                                            }) : null}
                                        </Panel>
                                    </Collapse>)
                                }))
                            }) : null
                        }
 </Modal>
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
                            <Button color="info" style={{ width: "100%" }}>Add Player</Button>
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
                            {tournamentMatch}
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
    const { MatchPlayerScore, TournamentMatchs } = state
    return {
        MatchPlayerScore: MatchPlayerScore,
        TournamentMatches: TournamentMatchs,
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