import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';

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
    this.props.action.Player.deletePlayer(id);
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
          <td><Button color="info" onClick={() => this.btnEditClick(player)} style={{ width: "62px" }} >Edit</Button></td>
          <td><Button color="danger" onClick={() => this.btnDeleteClick(player.id)} >Delete</Button></td>
        </tr>
      })
    } else { return <tr>No Player Found</tr> }

    return (
      <div>
        <PanelHeader size="sm" />
        <div style={{ marginLeft: "15px" }}>
          <AddPlayer isOpen={this.state.modal} toggle={this.btnAddClick.bind(this)} data={this.state}> </AddPlayer>
          <div style={{ width: "10%", margin: "25px" }}>
            <div>
              Show entries<Input type="select" name="select" id="exampleSelect">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
            </div>
          </div>
          <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add</Button>
          <Table responsive hover>
            <thead className="thead-dark">
              <tr style={{ textAlign: "center" }}>
                <th>Avtar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Description</th>
                <th colSpan="2">Action</th>          
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