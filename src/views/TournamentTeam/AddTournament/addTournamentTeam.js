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
      tournamentTeams: []
    }
  }

  componentDidMount = () => {
    this.props.action.Tournament.fetchTournamentDataAction();
  }

  AddData = () => {
    const { tournamentId, teams } = this.state;
    let newTeams = this.props.TeamsData.filter((team) => {
      return teams.includes(team.id)
    })

    newTeams.map((team) => {
      this.props.action.TournamentTeam.AddTournamentTeamAction({ tournamentId: tournamentId, teamId : team.id  },team);
      return true;
    });

    this.setState({ tournamentId: '', teams: [] });
    this.props.toggle();
  }

  handleChange = (e) => {
    if (e.target.name === "tournamentId") {
      let id = e.target.value;

      this.setState({ [e.target.name]: e.target.value });
      this.props.action.Team.fetchTeamAction();

      let teams = this.props.ShowTornamentAll.map((tournament) => {
        return (tournament.id === parseInt(id, 10)) ? tournament.Teams : undefined;
      })

      let filteredteams = teams.filter((team) => {
        return team !== undefined;
      });

      this.setState({ tournamentTeams: filteredteams[0] });
      this.setState({teams:[]})
    }
  }

  handleSelect = (e) => {
    this.setState({ teams: e });
    let id = e[e.length - 1];
    this.props.action.Team.getTeamAction(id);
  }

  closeModal=()=>{
    this.setState({ tournamentId: '', teams: [] });
    this.props.toggle();
  }

  render() {
    const Option = Select.Option;
    let teamNames = "";
    if (this.props.ShowTeamAll && this.props.ShowTeamAll.length > 0) {
      let teamId
      if (this.state.tournamentTeams) {
        if(this.state.tournamentTeams.length > 0)
        {
          teamId = this.state.tournamentTeams.filter((team) => {
            let teamStatus = team.TournamentTeam;
            return (teamStatus.isDelete===0)
          })

          let team_id = teamId.map((team) => {
            return team.id
          })
    
          let teamsdata = this.props.ShowTeamAll.filter((team) => {
            return !team_id.includes(team.id);
          })
   
          teamNames = teamsdata.map((team) => {
            return <Option value={team.id} id={team.id} key={team.id}>{team.teamName}</Option>
          })
        }
        
        else if (this.state.tournamentTeams.length === 0) {
          teamNames = this.props.ShowTeamAll.map((team) => {
            return <Option value={team.id} id={team.id} key={team.id}>{team.teamName}</Option>
          })
        }
      }
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
                </FormGroup>
                
                <FormGroup>
                  <Label for="exampleSelect">Select Team Name</Label>
                  <Select
                    mode="multiple"
                    name="teamId"
                    style={{ width: '100%' }}
                    placeholder="Select Teams"
                    value={teams}
                    onChange={this.handleSelect}
                  >{teamNames}</Select>
                </FormGroup>
              
              </Form>
            </ModalBody>
            
            <ModalFooter>
              <Button color="info" onClick={this.AddData.bind(this)}>Submit</Button>{' '}
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
    TeamsData: state.Team.TeamSData
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
