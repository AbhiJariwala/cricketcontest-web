import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { PanelHeader } from "components";
import { Collapse } from 'antd';
import 'antd/dist/antd.css';

import * as teamPlayerAction from '../../action/teamPlayer';
import AddTeamPlayer from './AddTeamPlayer/AddTeamPlayer';

const Panel = Collapse.Panel;

class TeamPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            showTeamModal: false,
            tournamentId: 0,
            teamId: 0,
            tournamentTeamPlayer: [],
            pageNo: 0,
            recordPerPage: 5,
        };

        this.toggle = this.toggle.bind(this);
        this.ShowTeamModaltoggle = this.ShowTeamModaltoggle.bind(this);
    }

    componentDidMount() {
        this.props.action.getTeamPlayerData.getTournaments();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    ShowTeamModaltoggle() {
        this.setState({
            showTeamModal: !this.state.showTeamModal
        });
    }

    CollapseChangeHandler(teamId) {
        this.setState({ teamId: teamId });
        this.props.action.getTeamPlayerData.getPlayerOfTeam(this.state.tournamentId, teamId);
    }

    // prevHandler(e) {

    // }
    // nextHandler(e) {
    // }

    renderTable(teamplayer) {

        return (
            <tbody key={teamplayer.id}>
                <tr style={{ textAlign: "center" }} >
                    <td>{teamplayer.tournamentName}</td>
                    <td><Button color="info" onClick={() => this.showTeamHandler(teamplayer.id)} style={{ width: "100px" }}>Show Teams</Button></td>
                </tr>
            </tbody>
        );
    }

    showTeamHandler(tournamentId) {
        this.ShowTeamModaltoggle();
        this.setState({ tournamentId: tournamentId });
        this.props.action.getTeamPlayerData.getTeamByTournamanetId(tournamentId);
    }

    rendershowTeamsModal() {
        debugger
        let player = [];
        if (this.props.playerofteam) {
            this.props.playerofteam.map(playerdata => {
                return player.push(playerdata.Players.map(p => {
                    return <ul key={p.id}><li>{p.firstName}{' '}{p.lastName}</li></ul>
                }))

            });
        }
        return (
            <Modal isOpen={this.state.showTeamModal} toggle={this.ShowTeamModaltoggle} className={this.props.className} >
                <ModalHeader toggle={this.ShowTeamModaltoggle}>Teams</ModalHeader>
                <ModalBody>
                    {(this.props.teams.Teams) ?
                        this.props.teams.Teams.map((data) => {
                            return (<Collapse key={data.id} onChange={this.CollapseChangeHandler.bind(this, data.id)} accordion>
                                <Panel header={data.teamName} key={data.id} >
                                    {player}
                                </Panel>
                            </Collapse>)
                        }) : <p>No Teams</p>
                    }
                </ModalBody>
            </Modal>
        );
    }

    render() {
        debugger
        let teamplayerdetails = "";
        if (this.props.tournaments) {
            teamplayerdetails = this.props.tournaments.map((teamplayer) => this.renderTable(teamplayer))
        }
        return (
            <div>
                <PanelHeader size="sm" />
                <div className="content">
                    {this.state.modal ? <AddTeamPlayer isOpen={this.state.modal} toggle={this.toggle} /> : null}
                    <div style={{ marginTop: "50px" }}>
                        {/* <div style={{ float: "right" }}>
                            Show entries
                            <Input type="select" name="noOfEntries" id="noOfEntries">
                                <option>5</option>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input>
                        </div> */}

                        <div style={{ float: "left" }}>
                            <Button color="info" onClick={this.toggle}>Add </Button>
                        </div>
                    </div>
                    <Table responsive hover>
                        <thead className="thead-dark">
                            <tr style={{ textAlign: "center" }}>
                                <th>Tournament</th>
                                <th>Team</th>
                            </tr>
                        </thead>
                        {teamplayerdetails}
                    </Table>
                    {/* <ButtonGroup>
                        <Button color="info" onClick={this.prevHandler.bind(this)}>Prev</Button>&nbsp;
                        <Button color="info" onClick={this.nextHandler.bind(this)}>Next</Button>
                    </ButtonGroup> */}
                </div>
                {this.rendershowTeamsModal()}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tournaments: state.teamPlayer.tournaments,
        teams: state.teamPlayer.teams,
        teamplayers: state.teamPlayer.teamplayers,
        playerofteam: state.teamPlayer.playerofteam
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        getTeamPlayerData: bindActionCreators(teamPlayerAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamPlayer);

