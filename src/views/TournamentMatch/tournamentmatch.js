import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button } from 'reactstrap';
import { Input, ButtonGroup } from 'reactstrap';
import * as TournamentMatchAction from '../../action/TournamentMatch';
import * as TournamentAction from '../../action/Tournament';
import AddTournament from '../tournament/AddTournament/addTournament'
import { PanelHeader } from "components";
import path from '../../path';

class TournamentMatch extends Component {
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
      debugger;
    this.props.action.TournamentAction.fetchTournamentDataAction();
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  sortingdata = (Event) => {
    const sortingValueName = Event.target.childNodes[0].data;
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

      this.props.action.Tournament.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
    }
  }

  parpage = (Event) => {
    const parpage = parseInt(Event.target.value, 10);
    this.setState({ parpageRecord: parpage })
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, parpage, this.state.sortingValue, this.state.sortingValueName);
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
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  handlechangetournament =(Event) =>{
        console.log("select value ::",Event.target.value);
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
        tournamentDescription: data.tournamentDescription
      }
      this.setState({
        modal: !this.state.modal,
        Editdataid: tObject
      });
    }
  }

  render() {
    debugger;
    let notNext = 0;
    let data = ""
    if (this.props.TournamentMatchs) {
      data = this.props.TournamentMatchs.map((data, key) => {
        notNext = key + 1
        let dd = new Date(data.matchDate).getTime();
        let d = new Date(data.matchDate);
        let cdate=new Date().getTime();
        var remainday=Math.round((d-cdate)/(1000*60*60*24));
        var t=dd-cdate;
        remainday=Math.round((d-cdate)/(1000*60*60*24));
        var days=Math.floor(t/(1000*60*60*24));
        var hours=Math.floor((t%(1000*60*60*24))/(1000*60*60));
        var minutes=Math.floor((t%(1000*60*60))/(1000*60));
        var seconds=Math.floor((t%(1000*60))/1000);
        debugger;
        return <tr key={key}>
          <td><img src={path + data.Team1[0].teamLogo} height="70px" width="70px" alt="Team Image"/></td>  
          <td>{data.Team1[0].teamName} / {data.Team2[0].teamName}</td>
          <td><img src={path + data.Team1[0].teamLogo} height="70px" width="70px" alt="Team Image"  /></td>  
          <td>{d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()}</td>
          <td>{ (remainday>0) ? (( remainday > 10 ) ? (remainday +' days ') : (days  +' days  '+ hours+" : " +minutes+" : "+seconds) ): 'finished' }</td>
          <td> <Button color="info" onClick={() => this.Edittoggle(data)} style={{ width: "62px" }} value={data.id}>Edit</Button>{' '}</td>
        </tr>
      })
    }

    let tournamentD="";
    if(this.props.Tournament.length>0 && this.props.Tournament){
        tournamentD=this.props.Tournament.map((data,key) => {
            return <option value={data.id}>{data.tournamentName}</option>
        })
    }
    
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content"  >
          <AddTournament isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} >  </AddTournament>
          <div style={{ marginTop: "50px"}}>
            <div style={{ float: "right"}}>
                Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </Input>
            </div>
            <div style={{ float: "right" ,paddingRight:'50px' }}>
              Tournament<Input type="select" name="select" id="exampleSelect" onChange={this.handlechangetournament.bind(Event)}>
                        {tournamentD}
              </Input>
            </div>
            <div style={{ float: "left" }}>
              <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add </Button>
            </div>
          </div>
          {data ?
            <Table responsive hover>
              <thead className="thead-dark">
                <tr onClick={this.sortingdata.bind(Event)}>
                  <th colSpan="3" style={{textAlign:'center'}}>Teams</th>
                  <th>Date</th>
                  <th>Remainging Time</th>
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
              : <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev" disabled>Prev</Button>}
            &nbsp;
            {notNext >= this.state.parpageRecord ?
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> :
              <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next" disabled>Next</Button >}
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    TournamentMatchs: state.TournamentMatchs.tournamentmatchs,
    Tournament: state.Tournament.Tournamentss
  }
};

const mapDispatchToProps = (dispatch) => ({ 
  action: {
        TournamentMatchAction: bindActionCreators(TournamentMatchAction, dispatch),
        TournamentAction:bindActionCreators(TournamentAction,dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamentMatch)
