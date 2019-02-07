import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ImageUploader from 'react-images-upload'
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import * as TournamentAction from '../../../action/Tournament';
import path from '../../../path';
const deleteIcon = require('../../../Image/delete.jpg');

class AddTournament extends Component {
  state = {
    tournamentName: "",
    tournamentDescription: "",
    tournamentBanner: [],
    notcallnext: 0,
    createdBy: 0,
    updatedBy: 0,
    id: 0,
    imagebanner: false,
    fieldsErrors: { tournamentName: '', tournamentDescription: '', tournamentBanner: '' },
    fieldsValid: { tournamentName: false, tournamentDescription: false, tournamentBanner: "false" },
  }

  componentWillMount = () => {
    const userId = localStorage.getItem("userId");
    this.setState({ createdBy: userId, updatedBy: userId });
  }

  componentWillUpdate = () => {
    if (this.props.dataid !== null && this.props.dataid.length !== 0 && !this.state.notcallnext) {
      this.setState({
        tournamentName: this.props.dataid.tournamentName,
        tournamentDescription: this.props.dataid.tournamentDescription,
        tournamentBanner: this.props.dataid.tournamentBanner,
        notcallnext: 1,
        imagebanner: true,
        id: this.props.dataid.id,
      })
    }
  }
  
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.fieldsErrors;
    let fieldValidation = this.state.fieldsValid;
    switch (fieldName) {
      case 'tournamentName':
        fieldValidation.tournamentName = value.match(/^[a-zA-Z0-9_ ]+$/i);
        fieldValidationErrors.tournamentName = fieldValidation.tournamentName ? '' : ' Only Alphabets Allow'
        break;
      case 'tournamentDescription':
        fieldValidation.tournamentDescription = value.match(/^[~`!@#$%^&*()-=+a-zA-Z0-9_ ]+$/i);
        fieldValidationErrors.tournamentDescription = fieldValidation.tournamentDescription ? '' : ' Only Alphabets Allow'
        break;
      default:
        break;
    }
    this.setState({
      fieldsErrors: fieldValidationErrors,
      fieldsValid: fieldValidation
    }, this.validateForm);
  }
  inputChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }
  UpdateDataData = (Event) => {
    Event.preventDefault();
    let formdata = new FormData();
    formdata.append("id", this.state.id);
    formdata.append("tournamentName", this.state.tournamentName);
    formdata.append("tournamentDescription", this.state.tournamentDescription);
    if (this.props.dataid.imagebanner) {
      formdata.append("tournamentBanner", this.props.dataid.tournamentBanner);
    } else {
      formdata.append("tournamentBanner", this.state.tournamentBanner[0]);
    }
    formdata.append("updatedBy", parseInt(this.state.updatedBy, 10));
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const data = {
      "id": this.state.id,
      "tournamentName": this.state.tournamentName,
      "tournamentDescription": this.state.tournamentDescription,
      "tournamentBanner": this.state.tournamentBanner[0],
      "updatedBy": parseInt(this.state.updatedBy, 10)
    }
    this.props.action.Tournament.UpdateTournamentAction(this.props.dataid.id, data, formdata, config)
    this.props.toggle(Event);
  }
  AddDataData = (Event) => {
    Event.preventDefault();
    let formdata = new FormData();
    formdata.append("tournamentName", this.state.tournamentName);
    formdata.append("tournamentDescription", this.state.tournamentDescription);
    formdata.append("tournamentBanner", this.state.tournamentBanner[0]);
    formdata.append("createdBy", this.state.createdBy);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    this.props.action.Tournament.AddTournamentAction(formdata, config)
    this.props.toggle(Event);
  }
  imageChangedHandler(image) {
    this.setState({
      tournamentBanner: image
    })
    this.validateField("BannerImage", "true");
  }
  cancelImageClick = () => {
    this.props.dataid.imagebanner = false
    this.setState({ imagebanner: false })
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
      if (this.props.dataid.imagebanner) {
        image = <div align="center">
          <p></p><img src={path + this.props.dataid.tournamentBanner} height="100px" width="100px" alt="" />
          <img src={deleteIcon} height="25px" width="25px" onClick={this.cancelImageClick.bind(this)} style={{ marginBottom: "80px", marginLeft: "-20px", opacity: "0.7" }} alt="" />
        </div>
      } else {
        image = imageuploader
      }
    } else { image = imageuploader }
    return (
      <Container>
        <div style={{ float: "right", margin: "15px" }}>
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle} >{this.props.dataid ? " Update Tournament" : "Tournament"} </ModalHeader>
            <ModalBody>
              <Form >
                <FormGroup>
                  <Label for="tournamentName">Tournament Name</Label>
                  <Input type="text"
                    name="tournamentName"
                    id="tournamentName"
                    defaultValue={this.props.dataid ? this.props.dataid.tournamentName : ""}
                    placeholder="tournamentName"
                    onChange={this.inputChangeHandler.bind(this)} />
                  <span style={{ color: "red" }}>{this.state.fieldsErrors.tournamentName}</span>
                </FormGroup>
                <FormGroup>
                  <Label for="tournamentDescription">Tournament Description</Label>
                  <Input type="textarea" name="tournamentDescription" id="tournamentDescription" placeholder="tournamentDescription" defaultValue={this.props.dataid ? this.props.dataid.tournamentDescription : ""} onChange={this.inputChangeHandler.bind(this)} />
                  <span style={{ color: "red" }}>{this.state.fieldsErrors.tournamentDescription}</span>
                </FormGroup>
                <FormGroup>
                  {image}
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              {this.props.dataid ?
                <Button color="info" onClick={this.UpdateDataData.bind(this)}>Update</Button>
                : <Button color="info" onClick={this.AddDataData.bind(this)}>Submit</Button>}
              <Button color="secondary" onClick={this.props.toggle.bind(Event)}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};
const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTournament)
