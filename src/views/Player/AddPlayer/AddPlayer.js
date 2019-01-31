import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as PlayerAction from '../../../action/Player';
import { Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
class AddPlayer extends Component {
  state = {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    playerDescription: "",
    image: ""
  }

  componentDidUpdate = () => {
    //  console.log(this.props.isOpen)    
  }
  addTeamPlayer = () => {
    // this.props.action.Player.AddPlayerAction(this.state);
    this.props.toggle();
  }
  render() {
    return (
      <div>
        <div style={{ float: "right", margin: "15px" }}>
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle} >Player</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={(Event) => this.setState({ firstName: Event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={(Event) => this.setState({ lastName: Event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="dob">Date Of Birth</Label>
                  <Input type="date" name="dob" id="dob" placeholder="Date Of Birth" onChange={(Event) => this.setState({ dob: Event.target.value })} />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <Label>Gender</Label>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="gender" />Male
                  </Label>
                    <Label check>
                      <Input type="radio" name="gender" />Female
                  </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Player Description</Label>
                  <Input type="textarea" name="playerDescription" id="playerDescription" onChange={(Event) => this.setState({ playerDescription: Event.target.value })} />
                </FormGroup>

              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.addTeamPlayer.bind(this)}>Submit</Button>
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ShowPlayer: state.Player.PlayerData,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Player: bindActionCreators(PlayerAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer)