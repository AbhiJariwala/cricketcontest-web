import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table,Container,Button } from 'reactstrap';
import { Input,ButtonGroup  } from 'reactstrap';

import * as TournamentAction from '../../action/Tournament';
import AddTournamentTeam  from '../TournamentTeam/AddTournament/addTournamentTeam'
import { PanelHeader } from "components";

class tournament extends Component {
  componentDidMount=()=>{
    this.props.action.Tournament.SelectTournamentAction();
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
      return (    
        <Container>   
          
          <PanelHeader size="sm" />       
          <AddTournamentTeam isOpen={this.state.modal} toggle={this.toggle}  >  </AddTournamentTeam>
      <div style={{width:"10%",margin:"25px"}}>
      <div>
      Show entries<Input type="select" name="select" id="exampleSelect">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </Input></div>  
      </div>
      <Button color="info" onClick={this.toggle} style={{width:"62px"}}>Add </Button>
        <Table>
        <thead>
          <tr>
            <th>Tournament Name</th>
            <th>Tournament Team</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td> <Button color="info" onClick={this.toggle} style={{width:"62px"}}>Edit</Button>{' '}</td>
          </tr>
        </tbody>
      </Table>
      <ButtonGroup>
         <Button color="info">Prev</Button> &nbsp;       
        <Button color="info">Next</Button>
      </ButtonGroup>
      </Container>
      );
    }
  }
  const mapStateToProps = (state) => {
    const { auth } = state;
    return {
        auth: auth
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        Tournament: bindActionCreators(TournamentAction, dispatch)
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(tournament)
  