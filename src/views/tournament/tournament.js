import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';
import { message } from 'antd';
import * as TournamentAction from '../../action/Tournament';
import AddTournament from '../tournament/AddTournament/addTournament'
import { PanelHeader } from "components";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import path from '../../path';
import ShowTeams from '../TournamentTeam/showTeams';
import * as TournamentTeamAction from '../../action/TournamentTeam';

class tournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modal: false,
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataid: [],
      sortingValueName: "id",
      sortingValue: "desc",
      tournament: {}
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    this.props.action.Tournament.fetchTournamentAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
    const userId = localStorage.getItem("userId");
    this.setState({ updatedBy: userId });
  }

  sortingdata = (Event) => {
    let sortingValueName = ""
    if (Event.target.childNodes[0].data === "Tournament") {
      sortingValueName = "tournamentName"
    } else if (Event.target.childNodes[0].data === "Description") {
      sortingValueName = "tournamentDescription";
    }
    if (sortingValueName !== "Action") {
      let sortingValue = "asc";
      if (!this.state.sortingValueName) {
        this.setState({ sortingValueName: sortingValueName })
      }
      else if (this.state.sortingValueName === sortingValueName) {
        if (this.state.sortingValue === "asc") {
          sortingValue = "desc"
        } else {
          sortingValue = "asc"
        }
        this.setState({ sortingValueName: sortingValueName, sortingValue: sortingValue })
      }
      else {
        this.setState({ sortingValueName: sortingValueName, sortingValue: "asc" })
      }
      this.props.action.Tournament.SelectTournamentAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
    }
  }

  parpage = (Event) => {
    const parpage = parseInt(Event.target.value, 10);
    const pageno = 0
    this.setState({ parpageRecord: parpage, pageno: 0 })
    this.props.action.Tournament.SelectTournamentAction(pageno, parpage, this.state.sortingValue, this.state.sortingValueName);
  }

  changeRecord = (Event) => {
    let datachangeprevNext = Event.target.value;
    let pageno = 0
    if (datachangeprevNext === "Next") {
      this.setState({ pageno: this.state.pageno + 5 })
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
    this.props.action.Tournament.SelectTournamentAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
  }
  toggleTeam = () => {
    // this.props.action.Tournament.fetchTournamentAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
    this.setState({
      visible: !this.state.visible
    });
  }
  ShowTeam = (tournament) => {
    if (!tournament.Teams || tournament.Teams === []) {
      alert("no teams in tournament");
    } else {
      this.setState(
        {
          tournament: tournament,
          visible: true
        })
    }
  }
  handleDelete = (tournamnetId, team) => {
    message.success("successfully deleted");
    this.toggleTeam();
    let updatedBy = parseInt(this.state.updatedBy, 10);
    team.map(teamId => {
      this.props.action.TournamentTeam.DeleteTournamentTeamAction(tournamnetId, teamId, updatedBy);
      return teamId;
    })
  }
  Edittoggle = (data) => {
    if (!data) {
      alert("no data");
    } else {
      const tObject = {
        id: data.id,
        tournamentName: data.tournamentName,
        tournamentDescription: data.tournamentDescription,
        tournamentBanner: data.tournamentBanner,
        imagebanner: true
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }
  btnDeleteClick = (id) => {
    if (!id) {
      alert("no data");
    } else {
      confirmAlert({
        title: 'Delete Tournament',
        message: 'Are you sure you want to delete Tournament?.',
        buttons: [{
          label: 'Yes',
          onClick: () => { this.props.action.Tournament.DeleteTournamentAction(id, this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName) }
        },
        {
          label: 'No',
          onClick: () => { }
        }
        ]
      })
    }
  }
  render() {
    let notNext = 0;
    let data = ""
    let start = 0;
    if (this.props.ShowTornament.length !== 0) {
      start = this.state.pageno + 1
      data = this.props.ShowTornament.map((data, key) => {
        notNext = key + 1
        return <tr key={key} style={{ textAlign: "center" }}>
          <td>{start++}</td>
          <td><img src={path + 'thumbnail/' + data.tournamentBanner} alt="" ></img></td>
          <td>{data.tournamentName}</td>
          <th onClick={() => this.ShowTeam(data)}><Button color="info">Teams</Button></th>
          <td><img src={path + "edit.png"} alt="Edit" onClick={() => this.Edittoggle(data)} value={data.id} style={{ width: 30 }} ></img>
            <img src={path + "delete1.jpg"} alt="Edit" onClick={() => this.btnDeleteClick(data.id)} style={{ width: 30 }} ></img>
          </td>
        </tr>
      })
    } else {
      data = <tr><td>No Record</td></tr>;
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <ShowTeams tournament={this.state.tournament}
          teamid={this.state.teamid}
          tournamentid={this.state.tournamentid}
          deleteClick={this.handleDelete}
          visible={this.state.visible}
          toggleTeam={this.toggleTeam}
        />
        <div className="content"  >
          <AddTournament isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} >  </AddTournament>
          <div style={{ marginTop: "50px" }}>
            <div style={{ float: "right" }}>
              Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
            </div>
            <div style={{ float: "left", borderRadius: "50%" }}>
              <img src={path + "add.png"} alt="plus" onClick={this.toggle} style={{ width: 60, cursor: "pointer" }} ></img>
            </div>
          </div>
          {data ?
            <Table hover>
              <thead className="thead-dark">
                <tr onClick={this.sortingdata.bind(Event)} style={{ textAlign: "center" }}>
                  <th>#</th>
                  <th style={{ cursor: "pointer" }}>Banner</th>
                  <th style={{ cursor: "pointer" }}>Tournament</th>
                  <th>Teams</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data}
              </tbody>
            </Table>
            : ""}
          <ButtonGroup>
            {this.state.pageno !== 0 ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev"  >Prev</Button>
              : ""}
            &nbsp;
            {notNext >= this.state.parpageRecord ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> :
              ""}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ShowTornament: state.Tournament.Tournaments,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch),
    TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(tournament)
