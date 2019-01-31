import React, { Component } from 'react';
import { Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Select } from 'antd';
import 'antd/dist/antd.css';

import * as teamPlayerAction from '../../../action/teamPlayer';

const Option = Select.Option;

class AddTeamPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournamentId: 0,
            teamId: 0,
            player: [],
            selectedItems: [],
            playersSelected: []
        };

        this.tournamentNameChangeHandler = this.tournamentNameChangeHandler.bind(this);
        this.teamNameChangeHandler = this.teamNameChangeHandler.bind(this);
    }

    componentDidMount() {
        this.props.action.getTeamPlayerData.getTournaments();
        this.props.action.getTeamPlayerData.getPlayers();
    }

    tournamentNameChangeHandler(e) {
        this.props.action.getTeamPlayerData.getTeamByTournamanetId(e.target.value);
        this.setState({
            tournamentId: e.target.value
        })
    }

    teamNameChangeHandler(e) {
        this.setState({
            teamId: e.target.value
        })
    }

    handleChange = (selectedItems) => {
        this.setState({ selectedItems: selectedItems });
    };

    addteamplayer(e) {
        var players = this.state.selectedItems;
        var result = players.map(function (x) {
            return parseInt(x, 10);
        });

        var teamplayerdata = {
            tournamentId: parseInt(this.state.tournamentId, 10),
            teamId: parseInt(this.state.teamId, 10),
            selectedPlayers: result
        }
        console.log(teamplayerdata);
        this.props.action.getTeamPlayerData.AddTeamPlayer(teamplayerdata);
        this.props.toggle(e);
    }
    render() {
        let tournamentOption = "";
        let tournamentTeamOption = "";
        let teamPlayersOption = "";
        // var playersExists = []
        if (this.props.tournaments) {
            tournamentOption = this.props.tournaments.map((tournament) => {
                return (<option key={tournament.id} value={tournament.id}>{tournament.tournamentName}</option>)
            })
        }


        if (this.props.teams.Teams) {
            tournamentTeamOption = this.props.teams.Teams.map((team) => {
                return (<option key={team.id} value={team.id}>{team.teamName}</option>)
            })
        }


        if (this.props.players) {
            teamPlayersOption = this.props.players.map((player) => {
                return (<Option key={player.id}>{player.firstName + " " + player.lastName}</Option>)
            })
        }

        return (
            <Container>
                <div style={{ float: "right", margin: "15px" }}>
                    <Modal isOpen={this.props.isOpen}>
                        <ModalHeader toggle={this.props.toggle}>Team Player</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="tournamentName">Tournament Name:</Label>
                                    <Input type="select" name="select" onChange={this.tournamentNameChangeHandler} id="tournamentName">
                                        <option key="tournament" >Select Tournament</option>
                                        {tournamentOption}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="teamName">Team Name</Label>
                                    <Input type="select" name="teamName" id="teamName" onChange={this.teamNameChangeHandler}>
                                        <option key="team">Select Team</option>
                                        {tournamentTeamOption}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Players">Players</Label>

                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Select Players "
                                        value={this.state.selectedItems}
                                        onChange={this.handleChange}
                                    >{teamPlayersOption}</Select>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="info" onClick={this.addteamplayer.bind(this)}>Add</Button>
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tournaments: state.teamPlayer.tournaments,
        teams: state.teamPlayer.teams,
        players: state.teamPlayer.players
    }
}

const mapDispatchToProps = (dispatch) => ({
    action: {
        getTeamPlayerData: bindActionCreators(teamPlayerAction, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTeamPlayer)
