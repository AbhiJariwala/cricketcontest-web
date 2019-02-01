import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import ImageUploader from 'react-images-upload'

import * as PlayerAction from '../../../action/Player';
import path from '../../../path';

const deleteIcon = require('../../../Image/delete.jpg');
const FormData = require('form-data');

class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Player: { id: "", firstName: "", lastName: "", dob: "", gender: 0, description: "", playerImage: [], showimage: true }
    }
  }

  componentWillReceiveProps(nextProps) {
    let Player = nextProps.data.Player;
    if (nextProps.data.Player) {
      this.setState({
        Player: Player
      })
    }
  }

  genderChangeHandler(e) {
    let gender = 0;
    if (e.target.checked) {
      if (e.target.value === "Female") {
        gender = 2;
      }
      else {
        gender = 1;
      }
      this.setState({
        Player: {
          ...this.state.Player,
          gender: gender
        }
      })
    }
  }

  imageChangedHandler(image) {
    this.setState({
      Player: {
        ...this.state.Player,
        playerImage: image
      }
    })
  }

  inputChangedHandler(e) {
    if (e.target.name === "gender") {
      this.genderChangeHandler(e);
    }
    else {
      this.setState({
        Player: {
          ...this.state.Player,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  cancelImageClick() {
    this.setState({
      Player: {
        ...this.state.Player,
        showimage: false
      }
    })
  }

  btnSubmitClick = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("firstName", this.state.Player.firstName);
    formdata.append("lastName", this.state.Player.lastName);
    formdata.append("dob", this.state.Player.dob);
    formdata.append("gender", this.state.Player.gender);
    formdata.append("description", this.state.Player.description);
    if (this.state.Player.playerImage[0]) {
      formdata.append("playerImage", this.state.Player.playerImage[0]);
    } else {
      formdata.append("playerImage", this.state.Player.playerImage);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    let loginUserId = this.props.auth.userId;
    if (!this.props.data.Edit) {
      formdata.append("createdBy", loginUserId);
      this.props.action.Player.addPlayer(formdata, config);
    }
    else {
      let playerId = this.state.Player.id;
      formdata.append("id", playerId);
      formdata.append("updatedBy", loginUserId);
      this.props.action.Player.updatePlayer(playerId, formdata, config)
    }
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
                  <Input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.firstName} />
                </FormGroup>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.lastName} />
                </FormGroup>
                <FormGroup>
                  <Label for="dob">Date Of Birth</Label>
                  <Input type="date" name="dob" id="dob" placeholder="Date Of Birth" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.dob} />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <Label>Gender</Label>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="gender" onChange={this.inputChangedHandler.bind(this)} value="Male" checked={(this.state.Player.gender) === 1 ? true : false} />Male
                    </Label>
                    <Label check>
                      <Input type="radio" name="gender" onChange={this.inputChangedHandler.bind(this)} value="Female" checked={(this.state.Player.gender) === 2 ? true : false} />Female
                    </Label>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="textarea" name="description" id="playerDescription" onChange={this.inputChangedHandler.bind(this)} defaultValue={this.state.Player.description} />
                </FormGroup>
                {(this.state.Player.showimage) ?
                  <div align="center">
                    <img src={path + this.state.Player.playerImage} height="100px" width="100px" alt="" />
                    <img src={deleteIcon} height="25px" width="25px" onClick={this.cancelImageClick.bind(this)} style={{ marginBottom: "80px", marginLeft: "-20px", opacity: "0.7" }} alt="" />
                  </div>
                  : <ImageUploader
                    withIcon={true}
                    buttonText="Select Images"
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    withPreview={true}
                    onChange={this.imageChangedHandler.bind(this)}
                    maxFileSize={5242880}
                    withLabel={false}
                    singleImage={true}
                    accept={"image/*"} />}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.btnSubmitClick.bind(this)}>Submit</Button>
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { auth } = state
  return {
    auth: auth
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Player: bindActionCreators(PlayerAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer)
