import React, { Component } from 'react';
import AddtournamentPoint from '../tornamentPoints/AddTounamnetPoint/AddTournamentPoint'
import Demo from '../tornamentPoints/AddTounamnetPoint/demo'
import { PanelHeader } from "components";
import { Button } from 'reactstrap';

class tournamentPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <Button color="danger" onClick={this.toggle}>Add</Button>
        <AddtournamentPoint modal={this.state.modal} toggle={this.toggle}></AddtournamentPoint>
        <Demo></Demo>
        <h1>View</h1>
      </div>
    );
  }
}

export default tournamentPoint
