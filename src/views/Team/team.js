import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';

import * as TeamAction from '../../action/Team';
import AddTeam from '../Team/AddTeam/AddTeam';
import { PanelHeader } from "components";
class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataname: [],
      sortingValueName:"id",
      sortingValue:"desc"   
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount = () => {
    this.props.action.Team.SelectTeamAction(this.state.pageno,this.state.parpageRecord, this.state.sortingValue,this.state.sortingValueName);
  }
  sortingdata = (Event) => {
  
    const sortingValueName = Event.target.childNodes[0].data;
    if(sortingValueName!=="Action"){
    let sortingValue = "asc";
    if(!this.state.sortingValueName){
      this.setState({ sortingValueName:sortingValueName})      
    }else if(this.state.sortingValueName===sortingValueName){
      if(this.state.sortingValue==="asc"){
        sortingValue="desc"
      }else{
        sortingValue="asc"
      }
      this.setState({sortingValueName:sortingValueName,sortingValue:sortingValue})
      
    }else{
      this.setState({ sortingValueName:sortingValueName,sortingValue:"asc"})
    }    
    
    this.props.action.Team.SelectTeamAction(this.state.pageno,this.state.parpageRecord, sortingValue,sortingValueName);
  }
  }
  parpage = (Event) => {
  
    const parpage = parseInt(Event.target.value,10);
    this.setState({ parpageRecord: parpage })
    this.props.action.Team.SelectTeamAction(this.state.pageno, parpage, this.state.sortingValue,this.state.sortingValueName);
  }
  changeRecord = (Event) => {
  
    let datachangeprevNext = Event.target.value;
    let pageno = 0
    if (datachangeprevNext === "Next") {
      this.setState({ pageno: this.state.pageno + 5 })
      if (this.state.pageno === 0) {
        this.setState({ pageno: this.state.parpageRecord })
        pageno = this.state.parpageRecord
      } else {
        pageno = this.state.pageno + this.state.parpageRecord
      }
    }
    else if (datachangeprevNext === "Prev") {
      this.setState({ pageno: this.state.pageno - this.state.parpageRecord })
      pageno = this.state.pageno - this.state.parpageRecord
    }
    this.props.action.Team.SelectTeamAction(pageno, this.state.parpageRecord, this.state.sortingValue,this.state.sortingValueName);
  }
  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
    if (Event.target.value === "Edit") {
      
    } else {
    }
  }
  Edittoggle = (data) => {
    if (!data) {
      alert("no data");
    } else {
      const tObject = {
        id: data.id,
        teamName: data.teamName,
        
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }
  render() {
    let notNext=0;
    let data = ""
    if (this.props.ShowTeam) {
      data = this.props.ShowTeam.map((data, key) => {

        notNext=key+1
        return <tr key={key}>
          <td>{data.teamName}</td>
          
          <td> <Button color="info" onClick={() => this.Edittoggle(data)} style={{ width: "62px" }} value={data.id}>Edit</Button>{' '}</td>
        </tr>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div  className="content"  >        
          <AddTeam isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} >  </AddTeam>
          <div style={{marginTop:"50px"}}>
          <div style={{float:"right" }}>            
              Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
              </div>
              <div style={{float:"left"}}>
                  <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add </Button>
              </div>
              </div>
          <Table>
            <thead>
              <tr onClick={this.sortingdata.bind(Event)}>
                <th>teamName</th>
               
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data}
            </tbody>
          </Table>
          <ButtonGroup>
            {this.state.pageno !== 0 ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev">Prev</Button>
              : ""}
            &nbsp;
            
            {notNext>=this.state.parpageRecord?
        <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button>:""}
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
