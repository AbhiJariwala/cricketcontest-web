import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';

import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { Select } from 'antd';
import '../tournamentTeam.css';

import * as TournamentAction from '../../../action/Tournament';
import * as TeamAction from '../../../action/Team';
import * as TournamentTeamAction from '../../../action/TournamentTeam';

class AddTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: "",
      teams: [],
      tournamentTeams: [],
      createdBy: 0,
      submitted: false,
      noCallNext: 0
    }
  }

  componentWillMount = () => {
    const userId = localStorage.getItem("userId");
    this.setState({ createdBy: userId });
  }

  componentDidMount = () => {
    this.props.action.Tournament.fetchTournamentDataAction();
    this.props.action.Team.fetchTeamAction();
  }

  submitted = () => {
    this.setState({ submitted: true });
    this.AddData(true);
  }

  AddData = (submitted) => {
    const { tournamentId, teams } = this.state;
   let  tournamentIdd=this.props.tournament.id;
    if (submitted && teams.length > 0) {
      let newTeams = this.props.TeamsData.filter((team) => {
        return teams.includes(team.id)
      })

      newTeams.map((team) => {
        let id = team.id;
        this.props.action.TournamentTeam.AddTournamentTeamAction({ tournamentId: tournamentIdd, teamId: id, createdBy: this.state.createdBy }, team);
        return true;
      });
      
      this.setState({ tournamentId: '', teams: [], submitted: false, noCallNext: 0 });
      
      this.props.refresh();
      this.props.toggle("1");
    }
  }

  // handleChange = (tournamentId) => {

  //   let { noCallNext } = this.state;

  //   let id
  //   if (tournamentId !== undefined) {
  //     if (typeof (tournamentId) === 'number') {
  //       id = tournamentId;
  //     }
  //     else if (tournamentId.target.name === "tournamentId" && tournamentId.target.name !== undefined) {
  //       id = tournamentId.target.value;
  //     }
  //   }
  //   if (tournamentId && !noCallNext) {
  //     this.setState({ noCallNext: 1, teams: [], submitted: false });
  //     this.props.action.Team.fetchTeamAction();
  //   }
  //   if (this.state.tournamentId === "") {
  //     this.setState({ tournamentId: tournamentId });
  //   }

  //   if (this.props.filteredteams) {
  //     if (this.props.filteredteams.length !== this.state.tournamentTeams.length) {
  //       this.setState({ tournamentTeams: this.props.filteredteams });
  //     }
  //   }
  // }
  handleSelect = (e) => {
    this.setState({ teams: e });
    let id = e[e.length - 1];
    this.props.action.Team.getTeamAction(id);
  }
  closeModal = () => {
    this.setState({ tournamentId: '', teams: [], submitted: false, noCallNext: 0 });
    this.props.toggle(1);
  }
  render() {
    const Option = Select.Option;
    let teamNames = "";
    if(this.props.teamsdata && this.props.teamsdata.length>0){
    teamNames = this.props.teamsdata.map((team) => {
      return <Option value={team.id} id={team.id} key={team.id}>{team.teamName}</Option>
    })
  }

    const { tournamentId, teams } = this.state;
    let data = "";
    if (this.props.ShowTornamentAll && this.props.ShowTornamentAll.length > 0) {
      data = this.props.ShowTornamentAll.map((tournament) => {
        return <option value={tournament.id}
          id={tournament.id}
          key={tournament.id}>
          {tournament.tournamentName}

        </option>
      });
    }

    return (
      <Container>
        <div className="containerDiv">
          <Modal isOpen={this.props.isOpen} >
            <ModalHeader toggle={this.closeModal} >Tournament</ModalHeader>
            <ModalBody>
              <Form>
                {/* {(!this.props.tournament.id) ?
                  <FormGroup>
                    <Label for="exampleSelect">Select Tournament Name</Label>
                    <Input
                      onChange={this.handleChange}
                      type="select"
                      name="tournamentId"
                      value={tournamentId}>
                      <option hidden>Select Tournament</option>
                      {data}
                    </Input>

                    {(this.state.submitted && this.state.tournamentId === '') ?
                      <div>
                        <br />
                        <span style={{ color: "red" }}>
                          Please select tournament
                        </span>
                      </div> : null
                    }
                  </FormGroup> : null} */}
            
                <FormGroup>
                  <Label for="exampleSelect">Select Team Name</Label>
                  <Select
                    mode="multiple"
                    name="teamId"
                    style={{ width: '100%' }}
                    placeholder="Select Teams"
                    value={teams}
                    onChange={this.handleSelect}
                  >{teamNames}
                  </Select>


                  {(this.state.submitted && this.state.teams.length === 0 && this.props.tournament.id !== '') ?
                    <div>
                      <br />
                      <span className="alert">
                        Please select at least one team
                        </span>
                    </div> : null}
                </FormGroup>

              </Form>
            </ModalBody>

            <ModalFooter>
              <Button color="info" onClick={this.submitted}>Submit</Button>{' '}
              <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
            </ModalFooter>

          </Modal>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ShowTornamentAll: state.Tournament.Tournamentss,
    ShowTeamAll: state.Team.TeamData,
    Team: state.Team.Team,
    TeamsData: state.Team.TeamSData,
    ShowTornament: state.Tournament.Tournaments
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      Tournament: bindActionCreators(TournamentAction, dispatch),
      Team: bindActionCreators(TeamAction, dispatch),
      TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTournament))
