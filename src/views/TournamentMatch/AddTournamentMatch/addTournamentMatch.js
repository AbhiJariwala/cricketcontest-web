import React, { Component } from 'react';
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';

import * as TournamentAction from '../../../action/Tournament';
import * as TeamAction from '../../../action/Team';
import * as TournamentMatchAction from '../../../action/TournamentMatch';
import './AddTournamentMatch.css';


class AddTournamentMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: "",
      tournamentTeams: [],
      teams: [],
      team1: "",
      team2: "",
      date: '',
      isError: '',
      isteams: []
    }
  }

  componentDidMount() {
    this.props.action.Tournament.fetchTournamentDataAction();
  }

  handleChange = (e) => {
    if (e.target.name === "tournamentId") {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  isFutureDate(idate) {
    var today = new Date().getTime();
    idate = idate.split("-");
    idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
    return (today - idate) < 0;
  }

  handleChangeTeam = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
  }

  onChange = (e) => {
<<<<<<< HEAD
=======
    
>>>>>>> 9549e5912ba345bc57f6fed1a09ba080019cb7c9
    let date = e.target.value
    let teams = [];
    this.setState({ date });
<<<<<<< HEAD
    let isfuture = this.isFutureDate(date)
    if (isfuture) {
      this.setState({ isError: '' });
      this.props.action.Team.fetchTeamAction();
      this.props.ShowTornamentAll.map((tournament) => {
        if (tournament.TournamentMatches.length > 0) {
          tournament.TournamentMatches.map((match) => {
=======
    console.log("date::", date);
    this.props.action.Team.fetchTeamAction();
    this.props.ShowTornamentAll.map((tournament) => {
      
      if (tournament.TournamentMatches.length > 0) {
        console.log("matchdate::", tournament.TournamentMatches[0].matchDate);
        let teams = []
        tournament.TournamentMatches.map((match) => {
>>>>>>> 9549e5912ba345bc57f6fed1a09ba080019cb7c9
            let mDate = match.matchDate.split("T");
            if (mDate[0] === date) {
              teams.push(match.teamId1);
              teams.push(match.teamId2);
            }
            return null;
          })
        }
        return (tournament.id === parseInt(this.state.tournamentId, 10)) ? (
          this.setState({ teams: tournament.Teams })
        ) : null;
      })
      this.setState({ isteams: teams });
    }
    else {
      this.setState({ isError: 'Select valid date' });
    }
  }

  addrecord = (e) => {
    const obj={
      tournamentId: this.state.tournamentId,
      teamId1: this.state.team1,
      teamId2: this.state.team2,
      matchDate: this.state.date
    }
    this.props.action.TournamentMatch.AddTournamentMatchAction(obj);
    this.closeModal();
  }

  closeModal = () => {
    this.setState({
      tournamentId: "",
      tournamentTeams: [],
      teams: [],
      team1: "",
      team2: "",
      date: '',
      isError: '',
      isteams: []
    })
    this.props.toggle();
  }

  render() {
    const { tournamentId } = this.state;
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

    const { team1, isteams } = this.state;
    let teamlist1 = ""
    let filteredteams = this.state.teams.filter(team => {
      return !isteams.includes(team.id)
    })
    if (filteredteams !== '') {
      teamlist1 = filteredteams.map((t1, key) => {
        return <option value={t1.id} id={t1.id} key={t1.id}>{t1.teamName}</option>
      })
    }

    const { team2 } = this.state;
    let teamlist2 = ""
    if (team1 !== '') {
      if (filteredteams !== '') {
        teamlist2 = filteredteams.map((t2, key) => {
          if (this.state.team1 !== t2.id)
            return <option value={t2.id} id={t2.id} key={t2.id}>{t2.teamName}</option>
          else
            return '';
        })
      }
    }

    return (
      <Container>
        <div className="containerDiv">
          <Modal isOpen={this.props.isOpen} toggle={this.closeModal} >
            <ModalHeader toggle={this.closeModal} >Tournament Match</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleSelect">Select Tournament Name</Label>
                  <Input required={true} onChange={this.handleChange} type="select" name="tournamentId" value={tournamentId}>
                      <option hidden>select</option>
                      {data}
                  </Input>
                </FormGroup>
                {
                  (this.state.tournamentId !== '') ? (
                    <FormGroup>
                      <Label for="exampleSelect">Select Match Date</Label>
                      <Input type="date" name="dob" id="dob" placeholder="Matchdate" onChange={this.onChange.bind(this)} defaultValue={this.state.date} />
                    </FormGroup>
                  ) : null
                }
                {
                  (this.state.isError !== '') ?
                      (<span style={{ color: "red" }}>{this.state.isError}</span>) : null
                }
                {
                  (this.state.date !== '' && this.state.isError === '') ? (
                    <FormGroup>
                      <Label for="exampleSelect">Select Team 1</Label>
                      <Input required={true} onChange={this.handleChangeTeam} type="select" name="team1" value={team1}>
                        <option hidden>select</option>
                        {teamlist1}
                      </Input>
                    </FormGroup>
                  ) : null
                }
                {
                  (this.state.team1 !== '') ? (
                    <FormGroup>
                      <Label for="exampleSelect">Select Team 2</Label>
                      <Input required={true} onChange={this.handleChangeTeam} type="select" name="team2" value={team2}>
                        <option hidden>select</option>
                        {teamlist2}
                      </Input>
                    </FormGroup>
                  ) : null
                }
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.addrecord.bind(this)} >Submit</Button>{''}
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
    ShowTeamAll: state.Team.TeamData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      Tournament: bindActionCreators(TournamentAction, dispatch),
      Team: bindActionCreators(TeamAction, dispatch),
      TournamentMatch:bindActionCreators(TournamentMatchAction,dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTournamentMatch))
