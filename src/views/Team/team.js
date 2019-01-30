import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';

import * as TeamAction from '../../action/Team';
import AddTeam from '../Team/AddTeam/AddTeam';
import { PanelHeader } from "components";
class Team extends Component {
  componentDidMount = () => {
    this.props.action.Team.selectTeamAction();
  }
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
    let data = ""
    if (this.props.ShowTeam) {
      data = this.props.ShowTeam.map((data, key) => {
        return <tr key={key}>
          <td>{data.teamName}</td>
          <td> <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Edit</Button>{' '}</td>
        </tr>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div style={{marginLeft:"10px"}}>
          <AddTeam isOpen={this.state.modal} toggle={this.toggle}  >  </AddTeam>
          <div style={{ width: "10%", margin: "25px" }}>
            <div>
              Show entries<Input type="select" name="select" id="exampleSelect">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input></div>
          </div>
          <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add </Button>
          <Table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data}
            </tbody>
          </Table>
          <ButtonGroup>
            <Button color="info">Prev</Button> &nbsp;
        <Button color="info">Next</Button>
          </ButtonGroup>
        </div>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Team)
