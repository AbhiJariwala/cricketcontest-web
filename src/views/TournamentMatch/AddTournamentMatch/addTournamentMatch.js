import React, { Component } from 'react';
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';

import * as TournamentAction from '../../../action/Tournament';
import * as TeamAction from '../../../action/Team';
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
      isError: ''
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

  handleChangeTeam = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
  }

  onChange = (e) => {
    debugger;
    let date = e.target.value
    this.setState({ date });
    console.log("date::", date);
    this.props.action.Team.fetchTeamAction();
    this.props.ShowTornamentAll.map((tournament) => {
      debugger;
      if (tournament.TournamentMatches.length > 0) {
        console.log("matchdate::", tournament.TournamentMatches[0].matchDate);
        let teams = []
        tournament.TournamentMatches.map((match) => {
            let mDate = match.matchDate.split("T");
            console.log("mDate", mDate[0]);
            if (mDate[0] === date) {
              return teams.push([match.teamId1, match.teamId2]);
            }
            return null;
          })
         console.log('teams', teams);
      }
      return (tournament.id === parseInt(this.state.tournamentId, 10)) ? (
        this.setState({ teams: tournament.Teams })
      ) : null;
    })
  }

  addrecord = (e) => {
    //this.props.action.AllMatch.getAllTournamentMatch();
    console.log("Select record value::");
    console.log("Tournament id::", this.state.tournamentId);
    console.log("Team1 id::", this.state.team1);
    console.log("Team2 id::", this.state.team2);
    console.log("Match Date::", this.state.date);

    // let st=this.props.ShowTornamentAll.filter((tournament,key) => {
    //   return (parseInt(this.state.tournamentId, 10) === parseInt(tournament.id, 10))
    // })
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

    const { team1 } = this.state;
    let teamlist1 = ""
    if (this.state.teams !== '') {
      teamlist1 = this.state.teams.map((t1, key) => {
        return <option value={t1.id} id={t1.id} key={t1.id}>{t1.teamName}</option>
      })
    }

    const { team2 } = this.state;
    let teamlist2 = ""
    if (team1 !== '') {
      if (this.state.teams !== '') {
        teamlist2 = this.state.teams.map((t2, key) => {
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
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle} >Tournament Match</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="exampleSelect">Select Tournament Name</Label>
                  <Input
                    required={true}
                    onChange={this.handleChange}
                    type="select"
                    name="tournamentId"
                    value={tournamentId}>
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
                  (this.state.date !== '') ? (
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
                      <Input
                        required={true}
                        onChange={this.handleChangeTeam}
                        type="select"
                        name="team2"
                        value={team2}>
                        <option hidden>select</option>
                        {teamlist2}
                      </Input>
                    </FormGroup>
                  ) : null
                }
                {(this.state.isError !== '') ?
                  (<span style={{ color: "red" }}>{this.state.isError}</span>) : null
                }
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.addrecord.bind(this)} >Submit</Button>{''}
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
    ShowTeamAll: state.Team.TeamData
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      Tournament: bindActionCreators(TournamentAction, dispatch),
      Team: bindActionCreators(TeamAction, dispatch)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTournamentMatch))
