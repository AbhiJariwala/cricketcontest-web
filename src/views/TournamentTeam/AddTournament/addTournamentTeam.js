import React, { Component } from 'react';
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import * as TournamentAction from '../../../action/Tournament';
import * as TeamAction from '../../../action/Team';
import * as TournamentTeamAction from '../../../action/TournamentTeam';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import '../tournamentTeam.css';

class AddTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: "",
      teamId: "",
      tournamentTeams: []
    }
  }

  componentDidMount = () => {
    this.props.action.Tournament.fetchTournamentDataAction();
  }

  AddData = () => {
    const { tournamentId, teamId } = this.state;
    this.props.action.TournamentTeam.AddTournamentTeamAction({ tournamentId, teamId }, this.props.Team);
    this.setState({ tournamentId: '', teamId: '' });
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
      this.setState({ tournamentTeams: filteredteams });
    }
    if (e.target.name === "teamId") {
      let teamId = e.target.value;
      this.props.action.Team.getTeamAction(teamId);
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  render() {
    let teamNames = "";
    if (this.props.ShowTeamAll && this.props.ShowTeamAll.length > 0) {
      
      if(this.state.tournamentTeams.length!==0){
      let teamId = this.state.tournamentTeams[0].map((team) => {
        return team.id;
      })}
      let teamsdata = this.props.ShowTeamAll.filter((team) => {
        return !teamId.includes(team.id);
      })

      teamNames = teamsdata.map((team) => {
        return <option value={team.id} id={team.id} key={team.id}>{team.teamName}</option>
      })
    }

    const { tournamentId, teamId } = this.state;
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
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle} >Tournament</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleSelect">Select Tournament Name</Label>
                  <Input
                    onChange={this.handleChange}
                    type="select"
                    name="tournamentId"
                    value={tournamentId}>
                    <option>select</option>
                    {data}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Select team Name</Label>
                  <Input onChange={this.handleChange}
                    type="select"
                    name="teamId"
                    value={teamId}>
                    <option>select</option>
                    {teamNames}
                  </Input>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.AddData.bind(this)}>Submit</Button>{' '}
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
    ShowTornamentAll: state.Tournament.Tournamentss,
    ShowTeamAll: state.Team.TeamData,
    Team: state.Team.Team
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
