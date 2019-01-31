import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';

import * as PlayerAction from '../../action/Player';
// import AddPlayer from '../Player/AddPlayer/AddPlayer';
import { PanelHeader } from "components";
class Player extends Component {
  componentDidMount = () => {
    this.props.action.Player.selectPlayerAction();
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
      let data=""
      if(this.props.ShowPlayer){    
        data= this.props.ShowPlayer.map(data=>{
           return <tr key={data.id}>
             <td>{data.image}</td>
               <td>{data.firstName}</td>
               <td>{data.lastName}</td>
               <td>{data.dob}</td>
               <td>{data.gender}</td>
               <td>{data.playerDescription}</td>
               <td> <Button color="info" onClick={this.toggle} style={{width:"62px"}}>Edit</Button>{' '}</td>
             </tr>
         })}
      return (    
        <div>             
          <PanelHeader size="sm" /> 
          <div style={{marginLeft:"15px"}}>         
          <AddPlayer isOpen={this.state.modal} toggle={this.toggle}  >  </AddPlayer>
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
      {data?
        <Table>
        <thead>
        <tr>
            <th>Avtar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Description</th>
           <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </Table>
      :""}
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
    ShowPlayer: state.Player.PlayerData,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Player: bindActionCreators(PlayerAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Player)