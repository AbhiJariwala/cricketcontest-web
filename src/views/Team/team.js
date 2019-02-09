import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';

import * as TeamAction from '../../action/Team';
import AddTeam from '../Team/AddTeam/AddTeam';
import { PanelHeader } from "components";
import path from '../../path';
class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataid: [],
      sortingValueName: "id",
      sortingValue: "desc"
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount = () => {
    this.props.action.Team.selectTeamAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  parpage = (Event) => {
    const parpage = parseInt(Event.target.value, 10);
    this.setState({ parpageRecord: parpage })
    this.props.action.Team.selectTeamAction(this.state.pageno, parpage, this.state.sortingValue, this.state.sortingValueName);
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
    this.props.action.Team.selectTeamAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }
  sortingdata = (Event) => {
    let sortingValueName;
    if (Event.target.childNodes[0].data === "Team Name") {
      sortingValueName = "teamName"
    }
    if (sortingValueName !== "Action") {
      let sortingValue = "asc";
      if (!this.state.sortingValueName) {
        this.setState({ sortingValueName: sortingValueName })
      } else if (this.state.sortingValueName === sortingValueName) {
        if (this.state.sortingValue === "asc") {
          sortingValue = "desc"
        } else {
          sortingValue = "asc"
        }
        this.setState({ sortingValueName: sortingValueName, sortingValue: sortingValue })

      } else {
        this.setState({ sortingValueName: sortingValueName, sortingValue: "asc" })
      }
      this.props.action.Team.selectTeamAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
    }
  }
  Edittoggle = (data) => {
    if (!data) {
      alert("no data");
    } else {
      const tObject = {
        id: data.id,
        teamName: data.teamName,
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }
  render() {
    let notNext = 0;
    let data = ""
    if (this.props.ShowTeam) {
      data = this.props.ShowTeam.map((data, key) => {
        notNext = key + 1
        return <tr key={key} style={{ textAlign: "center" }} >
          <td><img src={path + data.teamLogo} alt="" style={{ width: "130px", height: "100px" }}></img></td>
          <td>{data.teamName}</td>
          <td>
            <img src={path + "edit.png"} alt="Edit" onClick={() => this.Edittoggle(data)} value={data.id} style={{ width: 30 }} ></img>
          </td>
        </tr>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <AddTeam isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid}>  </AddTeam>
          <div style={{ marginTop: "50px" }}>
            <div style={{ float: "right" }}>
              Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input></div>
            <div style={{ float: "left" }}>
              <img src={path + "add.png"} alt="plus" onClick={this.toggle} style={{ width: 60 }} ></img>
            </div>
          </div>
          {data ?
            <Table responsive hover>
              <thead className="thead-dark">
                <tr onClick={this.sortingdata.bind(Event)} style={{ textAlign: "center" }}>
                  <th>Team Logo</th>
                  <th style={{ cursor: "pointer" }}>Team Name</th>
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
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> : ""}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    ShowTeam: state.Team.TeamData,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Team: bindActionCreators(TeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Team)
