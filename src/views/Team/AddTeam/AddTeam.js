import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import * as TeamAction from '../../../action/Team';

class AddTeam extends Component {
  state = {
    teamName: "",

  }

  componentDidUpdate = () => {
    //  console.log(this.props.isOpen)    
  }
  AddDataData = () => {
    this.props.action.Team.AddTeamAction(this.state);
    this.props.toggle();
  }
  render() {
    return (
      <Container>
        <div style={{ float: "right", margin: "15px" }}>
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle} >Team</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="teamName">Team Name</Label>
                  <Input type="text" name="teamName" id="teamName" placeholder="Team Name" onChange={(Event) => this.setState({ teamName: Event.target.value })} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={this.AddDataData.bind(this)}>Submit</Button>{' '}
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
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Team: bindActionCreators(TeamAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTeam)
