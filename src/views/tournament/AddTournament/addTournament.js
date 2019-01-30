import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container, Button, ModalFooter, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

import * as TournamentAction from '../../../action/Tournament';

class AddTournament extends Component {
  state = {
    tournamentName: "",
    tournamentDescription: "",
    notcallnext: 0,
    id:0
  }
  componentDidUpdate = () => {
    if (this.props.dataid !== null && !this.state.notcallnext) {
      this.setState({
        tournamentName: this.props.dataid.tournamentName,
        tournamentDescription: this.props.dataid.tournamentDescription,
        notcallnext: 1,
        id:1,
      })
    }
  }
  UpdateDataData = (Event) => {
    this.props.action.Tournament.UpdateTournamentAction(this.props.dataid.id, this.state)
    this.props.toggle(Event);
  }
  AddDataData = (Event) => {
    this.props.action.Tournament.AddTournamentAction(this.state)
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
                  <Label for="tournamentName">Tournament Name</Label>
                  <Input type="text" name="tournamentName" id="tournamentName" defaultValue={this.props.dataid ? this.props.dataid.tournamentName : ""} placeholder="Tournament Name" onChange={(Event) => this.setState({ tournamentName: Event.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Tournament Description</Label>
                  <Input type="textarea" name="tournamentDescription" id="tournamentDescription" defaultValue={this.props.dataid ? this.props.dataid.tournamentDescription : ""} onChange={(Event) => this.setState({ tournamentDescription: Event.target.value })} />
                </FormGroup>
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
    ShowTornament: state.Tournament.TournamentData,
    ShowSingleTornament: state.Tournament.FetchSingleTournamentData,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTournament)
