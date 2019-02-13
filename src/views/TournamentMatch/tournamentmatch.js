import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
<<<<<<< HEAD
import { Table, Button, Modal, ModalHeader, ModalBody, Input, ButtonGroup } from 'reactstrap';
=======
import { Table, Button, Input, ButtonGroup } from 'reactstrap';
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
import * as TournamentMatchAction from '../../action/TournamentMatch';
import * as TournamentAction from '../../action/Tournament';
import AddTournamentMatch from './AddTournamentMatch/addTournamentMatch'
import { PanelHeader } from "components";
import path from '../../path';
import Timer from './DisplayTimer/displaytimer';
import WinnerModal from './winnerModal'

class TournamentMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tournamentid: 'selected',
      sort: false,
      pageno: 0,
      parpageRecord: 5,
      sorting: "",
      Editdataid: [],
      sortingValueName: "id",
      sortingValue: "desc",
      showWinner: false,
      data: ''
    };
    this.toggle = this.toggle.bind(this);
  }

<<<<<<< HEAD

=======
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
  componentWillMount = () => {
    this.props.action.TournamentAction.fetchTournamentDataAction();
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValueName, this.state.sortingValue);
  }

  sortingdata = (Event) => {
    const sortingValueName = Event.target.id;
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
<<<<<<< HEAD
      this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
=======
      this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, sortingValueName, sortingValue);
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
    }
  }

  parpage = (Event) => {
    const nrecord = parseInt(Event.target.value, 10);
    this.setState({ pageno: 0 });
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(0, nrecord, this.state.sortingValueName, this.state.sortingValue);
    this.setState({ parpageRecord: nrecord })
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
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(pageno, this.state.parpageRecord, this.state.sortingValueName, this.state.sortingValue);
  }

  handlechangetournament = (Event) => {
<<<<<<< HEAD
    console.log("select value ::", Event.target.value);
    this.setState({ [Event.target.name]: Event.target.value })
    if (Event.target.value !== 'selected')
      this.props.action.TournamentMatchAction.getTournamentMatch(Event.target.value);
    else
      this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
=======
    this.setState({ [Event.target.name]: Event.target.value })
    if (Event.target.value !== 'selected') {
      this.setState({ pageno: 0 });
      this.props.action.TournamentMatchAction.getTournamentMatch(Event.target.value);
    }
    else {
      let { pageno } = this.state;
      this.setState({ pageno: 0 });
      this.props.action.TournamentMatchAction.SelectTournamentMatchAction(pageno, this.state.parpageRecord, this.state.sortingValueName, this.state.sortingValue);

    }
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
  }

  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
  }

  winningTeam = (data) => {
    this.setState({ data: data });
    this.setState({ showWinner: true })

  }
  toggleWinner = () => {
    const { showWinner } = this.state;
    this.setState({ showWinner: !showWinner });
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
    let notNext = 0;
    let data = ""
<<<<<<< HEAD
    if (this.props.TournamentMatchs && this.props.TournamentMatchs.length > 0) {
      data = this.props.TournamentMatchs.map((data, key) => {
        notNext = key + 1
        let d = new Date(data.matchDate);
        let cdate = new Date().getTime();
        var remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
        remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
        //let t;
        // var days = Math.floor(t / (1000 * 60 * 60 * 24));
        // var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        // var seconds = Math.floor((t % (1000 * 60)) / 1000);
        return <tr key={key}>
          {(this.state.tournamentid === 'selected') ? (<td>{data.Tournament.tournamentName}</td>) : null}
          <td style={{ float: 'right' }}><img src={path + data.Team1[0].teamLogo} height="70px" width="70px" alt="TeamImage" />
            {
              (data.winningTeamId === data.Team1[0].id) ? <img src={path + 'winner.png'} height="30px" width="30px" alt="" /> : null
            }
          </td>
          <td style={{ textAlign: 'center' }}>{data.Team1[0].teamName} / {data.Team2[0].teamName}</td>
          <td><img src={path + data.Team2[0].teamLogo} height="70px" width="70px" alt="TeamImage"  >
            {
              (data.winningTeamId === data.Team2[0].id) ? <img style={{ zIndex: '20px' }} src={path + 'winner.png'} height="30px" width="30px" alt="" /> : null
            }
          </img>
          </td>
          <td>{d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}</td>
          {(remainday > 0) ? (
            (remainday > 20) ?
              (<td>{remainday + ' days '}</td>) : (<td><Timer date={data.matchDate} /></td>)
          ) : (
              <td style={{ cursor: 'pointer' }} onClick={this.winningTeam}>
                {'Finished'}

                <Modal isOpen={this.state.showWinner} centered toggle={this.toggleWinner}>
                  <ModalHeader toggle={this.toggleWinner}>Winner Team</ModalHeader>
                  <ModalBody>
                    {(data.winningTeamId === data.Team1[0].id) ? (
                      <div style={{ display: 'flex', backgroundImage: 'url(http://192.168.200.147:8087/winningdance.gif)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                        <h5>The winning team is </h5>
                        <br />
                        <img src={path + data.Team1[0].teamLogo} height="70px" width="70px" alt="TeamImage" />{" "}
                        <h3>{data.Team1[0].teamName}</h3>
                      </div>
                    ) : (
                        <div style={{ display: 'flex' }}>
                          <h5>The winning team is </h5>
                          <br />
                          <img src={path + data.Team2[0].teamLogo} height="70px" width="70px" alt="TeamImage" />{" "}
                          <h3>{data.Team2[0].teamName}</h3>
                        </div>
                      )}
                  </ModalBody>
                </Modal>

              </td>)
          }
          <td> <Button color="info" onClick={() => this.Edittoggle(data)} style={{ width: "62px" }} value={data.id}>Edit</Button>{' '}</td>
        </tr>
      })
    }
    else {
      data = <tr><td colSpan="6" style={{ textAlign: 'center' }}>No Match Exists</td></tr>
    }

=======
    let start = 0;
    if (this.state.tournamentid === 'selected') {
      if (this.props.TournamentMatchs && this.props.TournamentMatchs.length > 0) {
        start = 0;
        start = this.state.pageno + 1;
        data = this.props.TournamentMatchs.map((data, key) => {
          notNext = key + 1
          let d = new Date(data.matchDate);
          let cdate = new Date().getTime();
          var remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
          remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
          return <tr key={key}>
            <td>{start++}</td>
            <td>{data.Tournament.tournamentName}</td>
            <td><img src={path + data.Team1[0].teamLogo} style={{ float: "right" }} height="70px" width="70px" alt="TeamImage" />
              {
                (data.winningTeamId === data.Team1[0].id) ? <img style={{ position: 'relative', left: '66px' }} src={path + 'winbadge.png'} height="50px" width="30px" alt="" /> : null
              }
            </td>
            <td style={{ textAlign: 'center' }}>{data.Team1[0].teamName}  <b> VS</b>   {data.Team2[0].teamName}</td>
            <td><img src={path + data.Team2[0].teamLogo} height="70px" width="70px" alt="TeamImage" />
              {
                (data.winningTeamId === data.Team2[0].id) ? <img style={{
                  position: 'relative', left: '-80px',
                  top: '-20px'
                }} src={path + 'winbadge.png'} height="35px" width="30px" alt="" /> : null
              }
            </td>
            <td style={{ textAlign: 'center' }}>{d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}</td>
            {(remainday > 0) ? (
              (remainday > 5) ?
                (<td style={{ textAlign: 'center' }}>{remainday + ' days '}</td>) : (<td style={{ textAlign: 'center' }} ><Timer date={data.matchDate} /></td>)
            ) : (
                <td style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => this.winningTeam(data)}> {'Finished'} </td>)
            }
            <td> <Button color="info" style={{ width: "62px" }} value={data.id}>Edit</Button>{' '}</td>
          </tr>
        })
      }
      else {
        data = <tr><td colSpan="6" style={{ textAlign: 'center' }}>No Match Exists</td></tr>
      }

    }
    else {
      if (this.props.TournamentMatchById && this.props.TournamentMatchById.length > 0) {
        data = this.props.TournamentMatchById.map((data, key) => {
          notNext = key + 1
          let d = new Date(data.matchDate);
          let cdate = new Date().getTime();
          var remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
          remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
          return <tr key={key}>
            <td>{key + 1}</td>
            <td><img src={path + data.Team1[0].teamLogo} style={{ float: "right" }} height="70px" width="70px" alt="TeamImage" />
              {
                (data.winningTeamId === data.Team1[0].id) ? <img style={{ position: 'relative', left: '86px' }} src={path + 'winbadge.png'} height="50px" width="30px" alt="" /> : null
              }
            </td>
            <td style={{ textAlign: 'center' }}>{data.Team1[0].teamName}  <b> VS</b>   {data.Team2[0].teamName}</td>
            <td><img src={path + data.Team2[0].teamLogo} height="70px" width="70px" alt="TeamImage" />
              {
                (data.winningTeamId === data.Team2[0].id) ? <img style={{
                  position: 'relative', left: '-80px',
                  top: '-20px'
                }} src={path + 'winbadge.png'} height="35px" width="30px" alt="" /> : null
              }
            </td>
            <td style={{ textAlign: 'center' }}>{d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()}</td>
            {(remainday > 0) ? (
              (remainday > 5) ?
                (<td style={{ textAlign: 'center' }}>{remainday + ' days '}</td>) : (<td style={{ textAlign: 'center' }}><Timer date={data.matchDate} /></td>)
            ) : (
                <td style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => this.winningTeam(data)}> {'Finished'} </td>)
            }
            <td> <Button color="info" style={{ width: "62px" }} value={data.id}>Edit</Button>{' '}</td>
          </tr>
        })
      }
      else {
        data = <tr><td colSpan="6" style={{ textAlign: 'center' }}>No Match Exists</td></tr>
      }


    }


>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
    let tournamentD = "";
    if (this.props.Tournament.length > 0 && this.props.Tournament) {
      tournamentD = this.props.Tournament.map((data, key) => {
        return <option value={data.id} key={key}>{data.tournamentName}</option>
      })

    }

    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content" >
<<<<<<< HEAD
          <AddTournamentMatch isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} >  </AddTournamentMatch>
=======
          {
            (this.state.data !== '') ? (
              <WinnerModal isOpen={this.state.showWinner} data={this.state.data} toggleWinner={this.toggleWinner} />
            ) : null
          }
          <AddTournamentMatch tournamentid={this.state.tournamentid} isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} nrecord={this.state.parpageRecord} >  </AddTournamentMatch>
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
          <div style={{ marginTop: "50px" }}>
            {
              (this.state.tournamentid === 'selected') ? (
                <div style={{ float: "right" }}>
                  Show entries<Input type="select" name="select" id="exampleSelect" onChange={this.parpage.bind(Event)}>
                    <option>5</option>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </Input>
                </div>
              ) : null
            }
<<<<<<< HEAD

=======
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
            <div style={{ float: "right", paddingRight: '50px' }}>
              Tournament<Input type="select" name="tournamentid" id="exampleSelect" onChange={this.handlechangetournament.bind(Event)}>
                <option value={'selected'}>All Selected</option>
                {tournamentD}
              </Input>
            </div>
            <div style={{ float: "left" }}>
              <img src={path + "add.png"} alt="plus" onClick={this.toggle} style={{ width: 60, cursor: "pointer" }} ></img>
            </div>
          </div>
          {data ?
            <Table hover>
              <thead className="thead-dark">
                {
                  (this.state.tournamentid === 'selected') ? (
                    <tr onClick={this.sortingdata.bind(Event)}>
<<<<<<< HEAD
                      <th id={'tournamentId'} style={{ cursor: 'pointer' }}>Tournament</th>
                      <th colSpan="3" style={{ textAlign: 'center', cursor: 'pointer' }} id={'tournamentId'} >Teams</th>
                      <th>Date</th>
                      <th>Remainging Time</th>
=======
                      <th style={{ cursor: 'pointer' }}>#</th>
                      <th id={'tournamentId'} style={{ cursor: 'pointer' }}>Tournament</th>
                      <th colSpan="3" style={{ textAlign: 'center', cursor: 'pointer' }} id={'tournamentId'} >Teams</th>
                      <th style={{ textAlign: 'center' }}>Date</th>
                      <th style={{ textAlign: 'center' }}>Remaining Time</th>
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
                      <th>Action</th>
                    </tr>
                  ) : (
                      <tr>
<<<<<<< HEAD
                        <th colSpan="3" style={{ textAlign: 'center' }} id={'tournamentId'} >Teams</th>
                        <th>Date</th>
                        <th>Remainging Time</th>
=======
                        <th style={{ cursor: 'pointer' }}>#</th>
                        <th colSpan="3" style={{ textAlign: 'center' }} id={'tournamentId'} >Teams</th>
                        <th style={{ textAlign: 'center' }}>Date</th>
                        <th style={{ textAlign: 'center' }}>Remaining Time</th>
>>>>>>> a3f5ad4ca8399919c2a0f4ad4ee9d7e5322b7192
                        <th>Action</th>
                      </tr>
                    )
                }

              </thead>
              <tbody>
                {data}
              </tbody>
            </Table>
            : ""}
          {
            (this.state.tournamentid === 'selected') ? (
              <ButtonGroup>
                {this.state.pageno !== 0 ?
                  <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev">Prev</Button>
                  : <Button color="info" onClick={this.changeRecord.bind(Event)} value="Prev" hidden>Prev</Button>}
                &nbsp;
                {notNext >= this.state.parpageRecord ?
                  <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next">Next</Button> :
                  <Button color="info" onClick={this.changeRecord.bind(Event)} value="Next" hidden>Next</Button >}
              </ButtonGroup>
            ) : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    TournamentMatchs: state.TournamentMatchs.allmatchs,
    Tournament: state.Tournament.Tournamentss,
    AddTournament: state.Tournament.Tournamentss,
    TournamentMatchById: state.TournamentMatchs.tournamentMatches
  }
};

const mapDispatchToProps = (dispatch) => ({
  action: {
    TournamentMatchAction: bindActionCreators(TournamentMatchAction, dispatch),
    TournamentAction: bindActionCreators(TournamentAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamentMatch);