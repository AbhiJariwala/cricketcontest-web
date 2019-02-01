import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';
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
        gender: 0,
        description: "",
        playerImage: [],
        showimage: false
      }
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.props.action.Player.getPlayer();
  }


  calculateAge(dobString) {
    var dob = new Date(dobString);
    var ageDifMs = Date.now() - dob.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  btnAddClick() {
    this.setState({
      Player: {
        id: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: 0,
        description: "",
        playerImage: [],
        showimage: false
      },
      Edit: false
    })
    this.toggle();
  }

  btnEditClick(player) {
    this.setState({
      Player: {
        ...player,
        showimage: true
      },
      Edit: true
    })
    this.toggle();
  }

  btnDeleteClick(id) {
    confirmAlert({
      title: 'Delete player',
      message: 'Are you sure you want to delete player?.',
      buttons: [{
        label: 'Yes',
        onClick: () => { this.props.action.Player.deletePlayer(id); }
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
    if (this.props.Player) {
      player = this.props.Player.PlayerData.map((player, key) => {
        return <tr key={key} style={{ textAlign: "center" }}>
          <td><img src={path + player.playerImage} height="70px" width="70px" alt="playerImage" /></td>
          <td>{player.firstName}</td>
          <td>{player.lastName}</td>
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
              <Input type="select" name="select">
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
            </div>
            <div style={{ float: "left" }}>
              <Button color="info" onClick={this.toggle} style={{ width: "100%" }}>Add Player</Button>
            </div>
          </div>

          <Table responsive hover>
            <thead className="thead-dark">
              <tr style={{ textAlign: "center" }}>
                <th>Avtar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {player}
            </tbody>
          </Table>
          <ButtonGroup>
            <Button color="info">Prev</Button> &nbsp;
            <Button color="info">Next</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Player)