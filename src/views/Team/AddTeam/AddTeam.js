import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImageUploader from 'react-images-upload'
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import * as TeamAction from '../../../action/Team';
import path from '../../../path';
const deleteIcon = require('../../../Image/delete.jpg');
const Icon = require('../../../Image/defaultTeam.png');


class AddTeam extends Component {
  state = {
    teamName: "",
    id: 0,
    createdBy: 0,
    updatedBy: 0, teamLogo: [],
    imagebanner: false,
    fieldsErrors: { teamName: '' },
    fieldsValid: { teamName: false },
    submitted: false,
    alert_msg: ''
  }
  componentWillMount = () => {
    const userId = localStorage.getItem("userId");
    this.setState({ createdBy: userId, updatedBy: userId });
  }
  componentWillUpdate = () => {
    if (this.props.dataid.length !== 0 && this.props.dataid !== null && !this.state.notcallnext) {
      this.setState({
        teamName: this.props.dataid.teamName,
        tournamentBanner: this.props.dataid.tournamentBanner,
        notcallnext: 1,
        imagebanner: true,
        id: this.props.dataid.id,
      })
    }
  }
  inputChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
    this.setState({ submitted: false });
  }
  imageChangedHandler(image) {
    this.setState({
      teamLogo: image
    })
    this.validateField("BannerImage", "true");
    this.setState({ submitted: false });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.fieldsErrors;
    let fieldValidation = this.state.fieldsValid;
    switch (fieldName) {
      case 'teamName':
        fieldValidation.teamName = value.match(/^[a-zA-Z0-9_ ]+$/i);
        fieldValidationErrors.teamName = fieldValidation.teamName ? '' : ' Only Alphabets Allow'
        break;
      default:
        break;
    }
    this.setState({
      fieldsErrors: fieldValidationErrors,
      fieldsValid: fieldValidation
    }, this.validateForm);
  }

  UpdateDataData = (Event) => {
    let formdata = new FormData();
    formdata.append("id", this.state.id);
    formdata.append("teamName", this.state.teamName);
    if (this.props.dataid.teamLogo) {
      formdata.append("teamLogo", this.props.dataid.teamLogo);
    } else {
      formdata.append("teamLogo", this.state.teamLogo[0]);
    }
    formdata.append("updatedBy", parseInt(this.state.updatedBy, 10));
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const data = {
      "teamName": this.state.teamName,
      "teamLogo": this.state.teamLogo[0],
      "updatedBy": parseInt(this.state.updatedBy, 10),
      "id": this.state.id
    }
    Event.preventDefault();
    this.props.action.Team.UpdateTournamentAction(this.props.dataid.id, data, formdata, config)
    this.props.toggle(Event);
  }
  closeModal = () => {
    // debugger;
    this.setState({ submitted: false });
    this.props.toggle(Event);
  }
  submitted = () => {
    this.setState({ submitted: true });
    this.AddDataData(true);
  }

  AddDataData = (submitted) => {
    let formdata = new FormData();
    <img src={path + 'defaultTeam.png'} alt="" style={{ width: "130px", height: "100px" }}></img>
    if (submitted === true && this.state.teamName !== '') {
      formdata.append("teamName", this.state.teamName);
      if (this.state.teamLogo.length !== 0) {
        formdata.append("teamLogo", this.state.teamLogo[0]);
      }
      formdata.append("createdBy", parseInt(this.state.createdBy, 10));
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }

      }
      this.props.action.Team.AddTeamAction(formdata, config);
      this.closeModal();
    }
  }
  cancelImageClick = () => {
    this.props.dataid.teamLogo = false
    this.setState({
      ...this.state,
      imagebanner: false
    })
    this.validateField("imageBanner", true);

  }
  render() {
    let image;
    let imageuploader = <div><ImageUploader withIcon={true} buttonText="Select Images" imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']} withPreview={true}
      onChange={this.imageChangedHandler.bind(this)}
      maxFileSize={5242880}
      withLabel={false}
      singleImage={true}
      accept={"image/*"} />
      <center><span style={{ color: "red" }}>{this.state.fieldsErrors.BannerImage}</span></center></div>
    if (this.props.dataid !== null) {
      if (this.props.dataid.teamLogo) {
        image = <div align="center">
          <p></p><img src={path + this.props.dataid.teamLogo} height="100px" width="100px" alt="" />
          <img src={deleteIcon} height="25px" width="25px" onClick={this.cancelImageClick.bind(this)} style={{ marginBottom: "80px", marginLeft: "-20px", opacity: "0.7" }} alt="" />
        </div>
      } else {
        image = imageuploader
      }
    } else { image = imageuploader }

    return (
      <Container>
        <div style={{ float: "right", margin: "15px" }}>
          <Modal isOpen={this.props.isOpen} toggle={this.closeModal} >
            <ModalHeader toggle={this.closeModal} >Team</ModalHeader>
            <ModalBody>
              <Form method="post">
                <FormGroup>
                  <Label for="teamName">Team Name</Label>
                  <Input type="text" name="teamName" id="teamName" placeholder="Team Name" defaultValue={this.props.dataid ? this.props.dataid.teamName : ""} onChange={this.inputChangeHandler.bind(this)} />
                  <span style={{ color: "red" }}>{this.state.fieldsErrors.teamName}</span>
                  {(this.state.teamName === '' && this.state.submitted) ? <p style={{ color: "red" }}>* Required Teamname</p> : null}
                </FormGroup>
                <FormGroup>
                  {image}
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              {this.props.dataid && this.props.dataid.length !== 0 ?
                <Button color="info" onClick={this.UpdateDataData.bind(this)}>Update</Button>
                : <Button color="info" onClick={this.submitted.bind(this)}>Submit</Button>}
              <Button color="secondary" onClick={this.closeModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {

  return {
    ShowTeam: state.Team.TeamData,
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Team: bindActionCreators(TeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTeam)
