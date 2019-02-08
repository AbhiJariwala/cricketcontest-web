import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImageUploader from 'react-images-upload'
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import * as TeamAction from '../../../action/Team';

class AddTeam extends Component {
  state = {
    teamName: "",
    id: 0,
    createdBy:0,
    updatedBy:0,teamLogo:[],
    fieldsErrors: { teamName: '' },
    fieldsValid: { teamName: false },
  }
  componentWillMount=()=>{
    const userId = localStorage.getItem("userId");
    this.setState({createdBy:userId,updatedBy:userId});
  }
  componentWillUpdate = () => {
    if (this.props.dataid.length !== 0 && this.props.dataid !== null && !this.state.notcallnext) {
      this.setState({
        teamName: this.props.dataid.teamName,
        notcallnext: 1,
        id: this.props.dataid.id,
      })
    }
  }
  inputChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })   
  }
  imageChangedHandler(image) {
    this.setState({
      teamLogo: image
    })
    this.validateField("BannerImage", "true");
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
    const data ={
      teamName:this.state.teamName,
      updatedBy:parseInt(this.state.updatedBy,10),
      id:this.state.id
    }
    Event.preventDefault();    
    this.props.action.Team.UpdateTournamentAction(this.props.dataid.id, data)
    this.props.toggle(Event);
  }
  AddDataData = (Event) => { 
    debugger 
    let formdata = new FormData();
    formdata.append("teamName", this.state.teamName);
    formdata.append("teamLogo", this.state.teamLogo[0]);
    formdata.append("createdBy", parseInt(this.state.createdBy,10));
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    this.props.action.Team.AddTeamAction(formdata, config);
    this.props.toggle(Event);
  }
  render() {
    debugger
    let image = <div><ImageUploader withIcon={true} buttonText="Select Images" imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']} withPreview={true}
      onChange={this.imageChangedHandler.bind(this)}
      maxFileSize={5242880}
      withLabel={false}
      singleImage={true}
      accept={"image/*"} />
      <center><span style={{ color: "red" }}>{this.state.fieldsErrors.BannerImage}</span></center></div>
    return (
      <Container>
        <div style={{ float: "right", margin: "15px" }}>
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle} >Team</ModalHeader>
            <ModalBody>
              <Form method="post">
                <FormGroup>
                  <Label for="teamName">Team Name</Label>
                  <Input type="text" name="teamName" id="teamName" placeholder="Team Name" defaultValue={this.props.dataid ? this.props.dataid.teamName : ""} onChange={this.inputChangeHandler.bind(this)} />
                  <span style={{ color: "red" }}>{this.state.fieldsErrors.teamName}</span>
                </FormGroup>
                <FormGroup>
                  {image}
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              {this.props.dataid && this.props.dataid.length !== 0?
                <Button color="info" onClick={this.UpdateDataData.bind(this)}>Update</Button>
                : <Button color="info" onClick={this.AddDataData.bind(this)}>Submit</Button>}
              <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
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
    auth:state.auth
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Team: bindActionCreators(TeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTeam)
