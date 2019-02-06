import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

import * as PlayerAction from '../../action/Player';
import AddPlayer from '../Player/AddPlayer/AddPlayer';
import { PanelHeader } from "components";
import path from '../../path';

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Player: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: 1,
        description: "",
        playerImage: [],
        showimage: false
      },
      pageRecord: 1,
      noOfRecords: 5,
      sortFiled: 'id',
      sortType: 'DESC'
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.getPlayerData(this.state.pageRecord, this.state.noOfRecords, this.state.sortFiled, this.state.sortType);
  }

  calculateAge(dobString) {
    var dob = new Date(dobString);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getPlayerData(start, end, sortFiled, sortType) {
    this.props.action.Player.getPlayer(start, end, sortFiled, sortType);
  }

  showEntriesChanged(e) {
    let noOfRecords = parseInt(e.target.value, 10);
    let pageRecord = 1;
    this.setState({
      pageRecord: pageRecord,
      noOfRecords: noOfRecords
    })
    this.getPlayerData(pageRecord, noOfRecords, this.state.sortFiled, this.state.sortType);
  }


  btnPageChangeClick(e) {
    let pageRecord = 0;
    let noOfRecords = parseInt(this.state.noOfRecords, 10);
    if (e.target.name === "Prev") {
      pageRecord = this.state.pageRecord - this.state.noOfRecords;
    }
    else if (e.target.name === "Next") {
      pageRecord = this.state.pageRecord + this.state.noOfRecords;
    }
    this.setState({
      pageRecord: pageRecord
    })
    this.getPlayerData(pageRecord, noOfRecords, this.state.sortFiled, this.state.sortType);
  }

  sortingChangedHandler(e) {
    let sortingField = e.target.childNodes[0].data;
    let sortType = "ASC";

    if (sortingField !== "Avtar" && sortingField !== "Action" && sortingField !== "Description") {
      if (sortingField === "Age") sortingField = "dob"
      if (sortingField === "Name") sortingField = "firstName";
      if (sortingField === "Gender") sortingField = "gender";
      if (this.state.sortFiled === sortingField) {
        if (this.state.sortType === sortType) {
          sortType = 'DESC'
        } else {
          sortType = 'ASC'
        }
      }
      else {
        sortType = 'DESC'
      }
      this.setState({
        sortFiled: sortingField,
        sortType: sortType
      })
      this.getPlayerData(this.state.pageRecord, this.state.noOfRecords, sortingField, sortType);
    }
  }

  btnAddClick() {
    this.setState({
      Player: {
        id: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: 1,
        description: "",
        playerImage: [],
        showimage: false
      },
      Edit: false,
      // fieldsValid: { firstName: false, lastName: false, dob: false, playerImage: "false" },
      // formValid: false
    })
    this.toggle();
  }

  btnEditClick(player) {
    this.setState({
      Player: {
        ...player,
        showimage: true
      },
      Edit: true,
      // formValid: true,
      // fieldsValid: { firstName: true, lastName: true, dob: true, playerImage: "true" },
    })
    this.toggle();
  }

  btnDeleteClick(id) {
    confirmAlert({
      title: 'Delete player',
      message: 'Are you sure you want to delete player?.',
      buttons: [{
        label: 'Yes',
        onClick: () => {
          this.props.action.Player.deletePlayer(id, this.state.pageRecord, this.state.noOfRecords, this.state.sortFiled, this.state.sortType);
        }
      },
      {
        label: 'No',
        onClick: () => { }
      }
      ]
    })
  }
  render() {
    let player = '';
    let start = 0;
    if (this.props.Player) {
      start = 0;
      start = this.state.pageRecord;
      player = this.props.Player.PlayerData.map((player, key) => {
        return <tr key={key} style={{ textAlign: "center" }} >
          <td>{start++}</td>
          <td><img src={path + player.playerImage} height="70px" width="70px" alt="playerImage" /></td>
          <td>{player.firstName}&nbsp;{player.lastName}</td>
          <td>{this.calculateAge(player.dob).toString()}</td>
          <td>{(player.gender === 1) ? "Male" : "Female"}</td>
          <td>{player.description}</td>
          <td><Button color="info" onClick={() => this.btnEditClick(player)} style={{ width: "62px" }} >Edit</Button>&nbsp;
            <Button color="danger" onClick={() => this.btnDeleteClick(player.id)} >Delete</Button></td>
        </tr>
      })
    } else { return <tr>No Player Found</tr> }
    return (
      <div>
        <PanelHeader size="sm" />
        <div style={{ marginLeft: "15px" }}>
          <AddPlayer isOpen={this.state.modal} toggle={this.btnAddClick.bind(this)} data={this.state}> </AddPlayer>
          <div style={{ marginTop: "50px" }}>
            <div style={{ float: "right" }}>
              Show entries
                <Input type="select" name="select" onChange={this.showEntriesChanged.bind(this)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Input>
            </div>
            <div style={{ float: "left" }}>
              <Button color="info" onClick={this.toggle} style={{ width: "100%" }}>Add Player</Button>
            </div>
          </div>

          <Table hover>
            <thead className="thead-dark">
              <tr style={{ textAlign: "center" }} onClick={this.sortingChangedHandler.bind(this)}>
                <th>#</th>
                <th>Avtar</th>
                <th style={{ cursor: "pointer" }}>Name</th>
                <th style={{ cursor: "pointer" }}>Age</th>
                <th style={{ cursor: "pointer" }}>Gender</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {player}
            </tbody>
          </Table>
          <ButtonGroup>
            {(this.state.pageRecord !== 1) ? <Button color="info" onClick={this.btnPageChangeClick.bind(this)} name="Prev">Prev</Button> : null}&nbsp;
            {(start >= this.state.pageRecord + this.state.noOfRecords) ?
              <Button color="info" onClick={this.btnPageChangeClick.bind(this)} name="Next">Next</Button> : null}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { Player } = state
  return {
    Player: Player
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Player: bindActionCreators(PlayerAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Player);