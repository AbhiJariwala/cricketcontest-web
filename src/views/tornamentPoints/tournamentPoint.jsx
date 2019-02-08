import React, { Component } from 'react';
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
import { PanelHeader } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddTournamentPoint from './AddTounamnetPoint/addTournamentPoint';
import * as tournamentPointAction from '../../action/tournamentPoint';

class tournamentPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      offset: 0,
      perPageRecord: 5,
      orderByName: "id",
      orderBy: "desc"
    };
    this.toggle = this.toggle.bind(this);
    this.perPage = this.perPage.bind(this);
    this.changeRecord = this.changeRecord.bind(this);
    this.getPoints= this.getPoints.bind(this);
  }

  componentDidMount() {
    this.props.action.TournamentPoint.getTournamentPointScore(this.state.offset, this.state.perPageRecord, this.state.orderByName, this.state.orderBy);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getPoints(){

  }

  perPage = (event) => {
    const perPage = parseInt(event.target.value, 10);
    this.setState({ perPageRecord: perPage })
    this.props.action.TournamentPoint.getTournamentPointScore(this.state.offset, perPage, this.state.orderByName, this.state.orderBy);
  }

  changeRecord = (event) => {
    let prevNext = event.target.value;
    let offset = 0;
    if (prevNext === "next") {
      this.setState({ offset: this.state.offset + 5 })
      if (this.state.offset === 0) {
        this.setState({ offset: this.state.perPageRecord })
        offset = this.state.perPageRecord
      } else {
        offset = this.state.offset + this.state.perPageRecord
      }
    }
    else if (prevNext === "prev") {
      this.setState({ offset: this.state.offset - this.state.perPageRecord })
      offset = this.state.offset - this.state.perPageRecord
    }
    this.props.action.TournamentPoint.getTournamentPointScore(offset, this.state.perPageRecord, this.state.orderByName, this.state.orderBy);
  }

  render() {
    let total = 0;
    let tournamentPoints = "";
    if (this.props.TournamentPoint) {
      tournamentPoints = this.props.TournamentPoint.map((tournamentPoint,i) => {
        total = i + 1;
        return (
          <tr key={tournamentPoint.id} style={{ textAlign: "center" }}>
            <td>{tournamentPoint.Tournament.tournamentName}</td>
            <td><Button color="info" onClick={this.getPoints}>Points</Button></td>
          </tr>
        )
      })
    }

    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">

          <AddTournamentPoint isOpen={this.state.modal} toggle={this.toggle}></AddTournamentPoint>

          <div style={{ marginTop: "50px" }}>
            <div style={{ float: "left" }}>
              <Button color="info" onClick={this.toggle}>Add Points</Button>
            </div>
            <div style={{ float: "right" }}>
              Show entries
              <Input type="select" name="entries" id="exampleSelect" onChange={this.perPage}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
            </div>
          </div>

          <Table responsive hover>
            <thead className="thead-dark">
              <tr style={{ textAlign: "center" }}>
                <th>Tournament Name</th>
                <th>Tournament Point</th>
              </tr>
            </thead>
            <tbody>
              {tournamentPoints}
            </tbody>
          </Table>

          <ButtonGroup>
            {this.state.offset <= 0 ?
              <Button color="info" onClick={this.changeRecord} value="prev" disabled>Prev</Button> :
              <Button color="info" onClick={this.changeRecord} value="prev">Prev</Button>}
            &nbsp;
            {total >= this.state.perPageRecord ?
              <Button color="info" onClick={this.changeRecord} value="next">Next</Button> :
              <Button color="info" onClick={this.changeRecord} value="next" disabled>Next</Button>}
          </ButtonGroup>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  TournamentPoint: state.TournamentPoint.get_points
})

const mapDispatchToProps = dispatch => ({
  action: {
    TournamentPoint: bindActionCreators(tournamentPointAction, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(tournamentPoint);
