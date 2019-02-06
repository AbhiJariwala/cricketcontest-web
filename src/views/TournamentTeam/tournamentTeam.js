import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonGroup, Input, Button as ReactButton } from 'reactstrap';
import { Collapse, Popconfirm, Button, message } from 'antd';
import * as TournamentAction from '../../action/Tournament';
import * as TournamentTeamAction from '../../action/TournamentTeam';
import AddTournamentTeam from '../TournamentTeam/AddTournament/addTournamentTeam'
import { PanelHeader } from "components";
import 'antd/dist/antd.css';
import './tournamentTeam.css'

class TournamentTeam extends Component {

  componentWillMount = () => {
    this.props.action.Tournament.fetchTournamentAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      refresh: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      sortingValueName: "id",
      sortingValue: "desc",
      tournamentsAll: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => {
      return { modal: !prevState.modal }
    });

  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props !== nextProps) {
      this.setState({ tournamentsAll: nextProps });
    }
  }

  refreshToggle = () => {
    this.setState({
      refresh: !this.state.refresh
    })
  }

  handleDelete = (tournamnetId, teamId) => {
    message.success("successfully deleted");
    this.props.action.TournamentTeam.DeleteTournamentTeamAction(tournamnetId, teamId);
  }

  parpage = (Event) => {
    const parpage = parseInt(Event.target.value, 10);
    this.setState({ parpageRecord: parpage })
    this.props.action.Tournament.fetchTournamentAction(this.state.pageno, parpage, this.state.sortingValue, this.state.sortingValueName);
  }

  changeRecord = (Event) => {
    let datachangeprevNext = Event.target.value;
    let pageno = 0
    if (datachangeprevNext === "Next") {
      this.setState({ pageno: this.state.pageno + this.state.parpageRecord })
      if (this.state.pageno === 0) {
        this.setState({ pageno: this.state.parpageRecord })
        pageno = this.state.parpageRecord
      } else {
        pageno = this.state.pageno + this.state.parpageRecord
      }
    }
    else if (datachangeprevNext === "Prev") {
      this.setState({ pageno: this.state.pageno - this.state.parpageRecord })
      pageno = this.state.pageno - this.state.parpageRecord
    }
    this.props.action.Tournament.fetchTournamentAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  render() {
    const ShowTornamentAll = [...this.state.tournamentsAll.ShowTornamentAll || []];
    const Panel = Collapse.Panel;
    let data = "";
    let notNext = 0;

    if (ShowTornamentAll && ShowTornamentAll.length > 0) {
      data = ShowTornamentAll && ShowTornamentAll.map((tournament, i) => {
        notNext = i + 1;
        let teams = [];
        if (tournament.Teams.length >= 0) {
          teams = tournament.Teams.map((team, i) => {
            return (
              <div key={i}>
                <div className="divTeam">
                  <p className="pTeam">{team.teamName}</p>
                  <Popconfirm title="Are you sure delete this team?" onConfirm={() => this.handleDelete(tournament.id, team.id)} okText="Yes" cancelText="No">
                    <Button type="danger" style={{ marginRight: "auto", left: "88%", position: "sticky" }} icon="delete" />
                  </Popconfirm>
                </div>
              </div>
            )
          });
        }
        return <Panel header={tournament.tournamentName} key={tournament.id}>
          <div className="panelDiv">
            <h5>{tournament.tournamentName}</h5>
            <p>{tournament.tournamentDescription}</p>
          </div>
          {teams}
        </Panel>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <AddTournamentTeam isOpen={this.state.modal} toggle={this.toggle} />
        <div className="headerDiv">
          <div className="inputDiv">
            Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </Input>
          </div>
          <ReactButton color="info" className="addbtn" onClick={this.toggle}>Add</ReactButton>
        </div>
        <div className="colapseDiv">
          <Collapse>
            {ShowTornamentAll && ShowTornamentAll.length > 0 ? data : null}
          </Collapse>
        </div>

        <ButtonGroup className="btnGroup">
          {this.state.pageno !== 0 ?
            <ReactButton color="info" onClick={this.changeRecord.bind(Event)} value="Prev"  >Prev</ReactButton>
            : <ReactButton color="info" onClick={this.changeRecord.bind(Event)} value="Prev" disabled>Prev</ReactButton>}
          &nbsp;
            {notNext >= this.state.parpageRecord ?
            <ReactButton color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</ReactButton> : <ReactButton color="info" onClick={this.changeRecord.bind(Event)} value="Next" disabled>Next</ReactButton>}
        </ButtonGroup>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ShowTornamentAll: state.Tournament.Tournaments,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch),
    TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamentTeam)

