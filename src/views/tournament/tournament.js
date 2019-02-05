import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';
import * as TournamentAction from '../../action/Tournament';
import AddTournament from '../tournament/AddTournament/addTournament'
import { PanelHeader } from "components";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import path from '../../path';
const abc = require('../../Image/delete.jpg');

class tournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataid: [],
      sortingValueName: "id",
      sortingValue: "desc"
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    this.props.action.Tournament.SelectTournamentAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  sortingdata = (Event) => {
    let sortingValueName=""
    if(Event.target.childNodes[0].data==="Tournament"){
       sortingValueName = "tournamentName"  
    }else if(Event.target.childNodes[0].data==="Description"){
       sortingValueName = "tournamentDescription";
    }
    if (sortingValueName !== "Action") {
      let sortingValue = "asc";
      if (!this.state.sortingValueName) {
        this.setState({ sortingValueName: sortingValueName })
      }
      else if (this.state.sortingValueName === sortingValueName) {
        if (this.state.sortingValue === "asc") {
          sortingValue = "desc"
        } else {
          sortingValue = "asc"
        }
        this.setState({ sortingValueName: sortingValueName, sortingValue: sortingValue })
      }
      else {
        this.setState({ sortingValueName: sortingValueName, sortingValue: "asc" })
      }
      this.props.action.Tournament.SelectTournamentAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
    }
  }

  parpage = (Event) => {
    const parpage = parseInt(Event.target.value, 10);
    this.setState({ parpageRecord: parpage })
    this.props.action.Tournament.SelectTournamentAction(this.state.pageno, parpage, this.state.sortingValue, this.state.sortingValueName);
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
    this.props.action.Tournament.SelectTournamentAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
  }

  Edittoggle = (data) => {
    if (!data) {
      alert("no data");
    } else {
      const tObject = {
        id: data.id,
        tournamentName: data.tournamentName,
        tournamentDescription: data.tournamentDescription,
        tournamentBanner:data.tournamentBanner,
        imagebanner:true
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }
  btnDeleteClick = (id) => {
    if (!id) {
      alert("no data");
    } else {
      confirmAlert({
        title: 'Delete Tournament',
        message: 'Are you sure you want to delete Tournament?.',
        buttons: [{
          label: 'Yes',          
          onClick: () => { this.props.action.Tournament.DeleteTournamentAction(id,this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName)}
        },
        {
          label: 'No',
          onClick: () => { }
        }
        ]
      })      
    }
  }

  render() {
    let notNext = 0;
    let data = ""
    if (this.props.ShowTornament) {
      data = this.props.ShowTornament.map((data, key) => {
        notNext = key + 1
        return <tr key={key} style={{ textAlign: "center" }}>
          <td><img src={path+ data.tournamentBanner} style={{width:"50px",height:"50px"}}></img></td>
          <td>{data.tournamentName}</td>
          <td>{data.tournamentDescription}</td>          
          <td> <Button color="info" onClick={() => this.Edittoggle(data)} style={{ width: "62px" }} value={data.id}>Edit</Button>
          &nbsp;<Button color="danger" onClick={() => this.btnDeleteClick(data.id)} >Delete</Button></td>
        </tr>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content"  >
          <AddTournament isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} >  </AddTournament>
          <div style={{ marginTop: "50px" }}>
            <div style={{ float: "right" }}>
              Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Input>
            </div>
            <div style={{ float: "left" }}>
              <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add </Button>
            </div>
          </div>
          {data ?
            <Table  hover>
              <thead className="thead-dark">
                <tr onClick={this.sortingdata.bind(Event)} style={{ textAlign: "center" }}>
                <th style={{cursor:"pointer"}}>Banner</th>
                  <th style={{cursor:"pointer"}}>Tournament</th>
                  <th style={{cursor:"pointer"}}>Description</th>                  
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data}
              </tbody>
            </Table>
            : ""}
          <ButtonGroup>
            {this.state.pageno !== 0 ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev"  >Prev</Button>
              :""}
            &nbsp;
            {notNext >= this.state.parpageRecord ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> :
              ""}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ShowTornament: state.Tournament.TournamentData,
  }
};

const mapDispatchToProps = dispatch => ({
  action: {
    Tournament: bindActionCreators(TournamentAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(tournament)
