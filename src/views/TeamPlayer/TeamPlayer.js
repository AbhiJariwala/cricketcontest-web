import React, { Component } from 'react'
import { Table, Button, Input, ButtonGroup, Modal, ModalHeader, ModalBody } from "reactstrap";
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
            tournamentTeamPlayer: []
        };

        this.toggle = this.toggle.bind(this);
        this.TeamModaltoggle = this.TeamModaltoggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    TeamModaltoggle() {
        this.setState({
            showTeamModal: !this.state.showTeamModal
        });
    }

    componentDidMount() {
        this.props.action.getTeamPlayerData.getTournaments();
    }

    showTeamHandler(id) {
        this.TeamModaltoggle();
        this.props.action.getTeamPlayerData.getTeamByTournamanetId(id);
    }


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

    CollapseChangeHandler(key) {
        if (this.props.teams.Teams) {
            this.props.teams.Teams.map((team) => {
                return (team.id === key) ?
                    this.setState({
                        tournamentTeamPlayer: team.player
                    }) : null
            })
        }
    }

    render() {
        let player = "";
        if (this.state.tournamentTeamPlayer) {
            player = this.state.tournamentTeamPlayer.map(p => {
                return <ul key={p.id}><li>{p.firstName}</li></ul>;
            });
        }
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
                        <div style={{ float: "right" }}>
                            Show entries
                            <Input type="select" name="select" id="exampleSelect">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                            </Input>
                        </div>

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
                    <ButtonGroup>
                        <Button color="info">Prev</Button>&nbsp;
                        <Button color="info">Next</Button>
                    </ButtonGroup>
                </div>

                <Modal isOpen={this.state.showTeamModal} toggle={this.TeamModaltoggle} className={this.props.className}>
                    <ModalHeader toggle={this.TeamModaltoggle}>Teams</ModalHeader>
                    <ModalBody>
                        {(this.props.teams.Teams) ?
                            this.props.teams.Teams.map((data) => {
                                return <Collapse key={data.id} onChange={this.CollapseChangeHandler.bind(this, data.id)} accordion>
                                    <Panel header={data.teamName} key={data.id} >
                                        {player}
                                    </Panel>
                                </Collapse>
                            })
                            : <p>No Teams</p>
                        }


                        {/* <p>{this.state.tournamentId}</p> */}
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tournaments: state.teamPlayer.tournaments,
        teams: state.teamPlayer.teams
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        getTeamPlayerData: bindActionCreators(teamPlayerAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamPlayer);

