import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import * as TeamAction from '../../../action/Team';

class AddTeam extends Component {
  state = {
    teamName: "",
    
    notcallnext: 0,
    id:0
  }
  componentWillUpdate = () => {
     if (this.props.dataid !== null && !this.state.notcallnext) {
      this.setState({
        teamName: this.props.dataid.teamName,
        
        notcallnext: 1,
        id:this.props.dataid.id,
        fieldsErrors: { teamName: '' },
        fieldsValid: { teamName: false },
      })
    }
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.fieldsErrors;
    let fieldValidation = this.state.fieldsValid;
    switch (fieldName) {
        case 'teamName':
            fieldValidation.teamName = value.match(/^[a-zA-Z0-9_ ]+$/i);
            fieldValidationErrors.teamName = fieldValidation.teamName ? '' : ' Only Alphabets Allow'
            break;
        // case 'tournamentDescription':
        //     fieldValidation.tournamentDescription = value.match(/^[~`!@#$%^&*()-=+a-zA-Z0-9_ ]+$/i);
        //     fieldValidationErrors.tournamentDescription = fieldValidation.tournamentDescription ? '' : ' Only Alphabets Allow'
        //     break;
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
    this.props.action.Team.UpdateTeamAction(this.props.dataid.id, this.state)
    this.props.toggle(Event);
  }
  AddDataData = (Event) => {
    Event.preventDefault();
    this.props.action.Tournament.AddTeamAction(this.state)
    this.props.toggle(Event);
  }
  render() {
    return (
      <Container>
        <div style={{ float: "right", margin: "15px" }}>
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle} >{this.props.dataid ? " Update Tournament" : "Tournament"} </ModalHeader>
            <ModalBody>
              <Form >
                <FormGroup>
                  <Label for="teamName">Team Name</Label>
                  <Input type="text" name="teamName" id="teamName" defaultValue={this.props.dataid ? this.props.dataid.teamName : ""} placeholder="teamName" onChange={this.inputChangeHandler.bind(this)} />
                  <span style={{ color: "red" }}>{this.state.fieldsErrors?this.state.fieldsErrors.teamName:""}</span>
                </FormGroup>
                {/* <FormGroup>
                  <Label for="tournamentDescription">Tournament Description</Label>
                  <Input type="textarea" name="tournamentDescription" id="tournamentDescription" placeholder="tournamentDescription" defaultValue={this.props.dataid ? this.props.dataid.tournamentDescription : ""}  onChange={this.inputChangeHandler.bind(this)}/>
                  <span style={{ color: "red" }}>{this.state.fieldsErrors?this.state.fieldsErrors.tournamentDescription:""}</span>
                </FormGroup> */}
              </Form>
            </ModalBody>
            <ModalFooter>
              {this.props.dataid ?
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
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Team: bindActionCreators(TeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTeam)
