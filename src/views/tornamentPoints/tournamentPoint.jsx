import React, { Component } from 'react';
import Demo from '../tornamentPoints/AddTounamnetPoint/demo'
import { PanelHeader } from "components";

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
        <Demo></Demo>
        <h1>View</h1>
      </div>
    );
  }
}

export default tournamentPoint
