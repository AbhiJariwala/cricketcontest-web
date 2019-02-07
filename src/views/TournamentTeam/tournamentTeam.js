import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import {Modal, message} from 'antd';
import { Input, ButtonGroup } from 'reactstrap';
import * as TournamentAction from '../../action/Tournament';
import * as TournamentTeamAction from '../../action/TournamentTeam';
import AddTournamentTeam from '../TournamentTeam/AddTournament/addTournamentTeam'
import { PanelHeader } from "components";
import 'antd/dist/antd.css';
import ShowTeams from './showTeams';
import path from '../../path.js'

class TournamentTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      teamModal: false,
      visible:false,
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      tournament:{},
      sortingValueName: "id",
      sortingValue: "desc",
      teamid:"",
      tournamentid:""
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    this.props.action.Tournament.fetchTournamentAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  sortingdata = (Event) => {
    const sortingValueName = Event.target.id;
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

      this.props.action.Tournament.fetchTournamentAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
    }
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
    this.props.action.Tournament.fetchTournamentAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  toggle(){
    this.setState({
      addModal: !this.state.addModal,
      Editdataid: null
    });
  }
  toggleTeam=()=>{
    this.setState({
      visible: !this.state.visible
  });
  }

  ShowTeam = (tournament) => {
    if (!tournament.Teams||tournament.Teams===[]) {
      alert("no teams in tournament");
    } else {
      this.setState(
        {
          tournament:tournament,
          visible: true
        })
      }
    }

    handleDelete = (tournamnetId,teamId) => {
      message.success("successfully deleted");
      this.toggleTeam();
      this.props.action.TournamentTeam.DeleteTournamentTeamAction(tournamnetId,teamId);
    }


  render() {

    console.log("tournament........",this.state.tournamentid);
    console.log("tournament........",this.state.teamid);
    let notNext = 0;
    let data = ""
    if (this.props.ShowTournamentAll && this.props.ShowTournamentAll.length>0) {
      data = this.props.ShowTournamentAll.map((tournament, key) => {
        notNext = key + 1
        return <tr key={key} style={{ textAlign: "center" }}>
          <td>{tournament.tournamentName}</td>
          <td>
          <Button color="info" onClick={()=>this.ShowTeam(tournament)}>Show Teams</Button>           
          </td>
        </tr>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content"  >
        <AddTournamentTeam isOpen={this.state.addModal} toggle={this.toggle}/>
          <Modal  title={this.state.tournament.tournamentName} 
                  visible={this.state.visible}
                  onCancel={this.toggleTeam}
                  footer={null}>
                  <ShowTeams tournament={this.state.tournament} teamid={this.state.teamid} tournamentid={this.state.tournamentid} deleteClick={this.handleDelete} visible={this.state.visible}/>
              
          </Modal>
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
            <div style={{ float: "left" }}>
            <img src={path+"add.png"} alt="plus" onClick={this.toggle} style={{ width: 60 }} ></img>
              {/* <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add </Button> */}
            </div>
          </div>
          {data ?
            <Table responsive hover>
              <thead className="thead-dark">
                <tr style={{ textAlign: "center" }} onClick={this.sortingdata.bind(Event)}>
                  <th id="tournamentName">Tournament</th>
                  <th>Team</th>
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
    ShowTournamentAll: state.Tournament.Tournaments,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch),
    TournamentTeam: bindActionCreators(TournamentTeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamentTeam)

