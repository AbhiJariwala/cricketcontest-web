import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';

import * as TournamentAction from '../../action/Tournament';
import AddTournament from '../tournament/AddTournament/addTournament'
import { PanelHeader } from "components";

const img1 = require('../../Image/asc.png');
const img2 = require('../../Image/desc.png')
class tournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      sort: false,
      pageno: 0,
      parpageRecord: "",
      sorting: "",
      Editdataid: []
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount = () => {
    const parpageRecord = 5, sorting = "asc", pageno = 0
    this.setState({ sorting: sorting, pageno: pageno, parpageRecord: parpageRecord })
    this.props.action.Tournament.SelectTournamentAction(pageno, parpageRecord, sorting);
  }
  sortingdata = (Event) => {
    console.log(Event.target.value)
    this.setState({ sort: !this.state.sort })
  }
  parpage = (Event) => {
    const parpage = Event.target.value;
    this.setState({ parpageRecord: parpage })
    this.props.action.Tournament.SelectTournamentAction(this.state.pageno, parpage, this.state.sorting);
  }
  changeRecord = (Event) => {
    let datachangeprevNext = Event.target.value;
    let pageno = 0
    if (datachangeprevNext === "Next") {
      this.setState({ pageno: this.state.pageno + 5 })
      if (this.state.pageno === 0) {
        this.setState({ pageno: 5 })
        pageno = 5
      } else {
        pageno = this.state.pageno + 5
      }
    }
    else if (datachangeprevNext === "Prev") {
      this.setState({ pageno: this.state.pageno - 5 })
      pageno = this.state.pageno - 5
    }
    this.props.action.Tournament.SelectTournamentAction(pageno, this.state.parpageRecord, this.state.sorting);
  }
  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
    if (Event.target.value === "Edit") {
      console.log(Event.target.value);
    } else {
    }
  }
  Edittoggle = (data) => {
    if (!data) {
      alert("no data");
    } else {
      const tObject = {
        id: data.id,
        tournamentName: data.tournamentName,
        tournamentDescription: data.tournamentDescription
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }
  render() {
    let data = ""
    if (this.props.ShowTornament) {
      data = this.props.ShowTornament.map((data, key) => {
        return <tr key={key}>
          <td>{data.tournamentName}</td>
          <td>{data.tournamentDescription}</td>
          <td> <Button color="info" onClick={() => this.Edittoggle(data)} style={{ width: "62px" }} value={data.id}>Edit</Button>{' '}</td>
        </tr>
      })
    }
    return (
      <div>
        <PanelHeader size="sm" />
        <div style={{ marginLeft: "20px" }}>
          <AddTournament isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} >  </AddTournament>
          <div style={{ width: "10%", margin: "25px" }}>
            <div>
              Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
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
                <th>
                  Tournament Name
              <div style={{ marginLeft: "215px", marginTop: "-27px" }}>
                    <div>
                      <img alt="true" src={img1} style={{ height: "10px", width: "10px", marginTop: "-18px", marginRight: "-11px" }} name="ascending" onClick={this.sortingdata.bind(Event)} value="Asc" ></img>
                      <img src={img2} alt="true" style={{ height: "10px", width: "10px" }} value="desc" onClick={this.sortingdata.bind(Event)}></img>
                    </div>
                  </div></th>
                <th>Tournament Description<div style={{ marginLeft: "300px", marginTop: "-27px" }}><div>
                  <img src={img1} alt="true" style={{ height: "10px", width: "10px", marginTop: "-18px", marginRight: "-11px" }} name="ascending" onClick={this.sortingdata.bind(this)} ></img>
                  <img src={img2} alt="true" style={{ height: "10px", width: "10px" }}></img>
                </div></div></th>
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
        <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button>
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
