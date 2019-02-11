import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Button, Modal, ModalHeader, ModalBody, Input, ButtonGroup } from 'reactstrap';
import * as TournamentMatchAction from '../../action/TournamentMatch';
import * as TournamentAction from '../../action/Tournament';
import AddTournamentMatch from './AddTournamentMatch/addTournamentMatch'
import { PanelHeader } from "components";
import path from '../../path';
import Timer from './DisplayTimer/displaytimer'

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
      showWinner: false
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount = () => {
    this.props.action.TournamentAction.fetchTournamentDataAction();
    this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
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
      this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, sortingValue, sortingValueName);
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

  handlechangetournament = (Event) => {
    console.log("select value ::", Event.target.value);
    this.setState({ [Event.target.name]: Event.target.value })
    if (Event.target.value !== 'selected')
      this.props.action.TournamentMatchAction.getTournamentMatch(Event.target.value);
    else
      this.props.action.TournamentMatchAction.SelectTournamentMatchAction(this.state.pageno, this.state.parpageRecord, this.state.sortingValue, this.state.sortingValueName);
  }

  toggle(Event) {
    this.setState({
      modal: !this.state.modal,
      Editdataid: null
    });
  }

  winningTeam = () => {
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
    if (this.props.TournamentMatchs && this.props.TournamentMatchs.length > 0) {
      data = this.props.TournamentMatchs.map((data, key) => {
        notNext = key + 1
        let d = new Date(data.matchDate);
        let cdate = new Date().getTime();
        var remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
        remainday = Math.round((d - cdate) / (1000 * 60 * 60 * 24));
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
          <AddTournamentMatch isOpen={this.state.modal} toggle={this.toggle} dataid={this.state.Editdataid} >  </AddTournamentMatch>
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

            <div style={{ float: "right", paddingRight: '50px' }}>
              Tournament<Input type="select" name="tournamentid" id="exampleSelect" onChange={this.handlechangetournament.bind(Event)}>
                <option value={'selected'}>All Selected</option>
                {tournamentD}
              </Input>
            </div>
            <div style={{ float: "left" }}>
              <Button color="info" onClick={this.toggle} style={{ width: "62px" }}>Add </Button>
            </div>
          </div>
          {data ?
            <Table hover>
              <thead className="thead-dark">
                {
                  (this.state.tournamentid === 'selected') ? (
                    <tr onClick={this.sortingdata.bind(Event)}>
                      <th id={'tournamentId'} style={{ cursor: 'pointer' }}>Tournament</th>
                      <th colSpan="3" style={{ textAlign: 'center', cursor: 'pointer' }} id={'tournamentId'} >Teams</th>
                      <th>Date</th>
                      <th>Remaining Time</th>
                      <th>Action</th>
                    </tr>
                  ) : (
                      <tr>
                        <th colSpan="3" style={{ textAlign: 'center' }} id={'tournamentId'} >Teams</th>
                        <th>Date</th>
                        <th>Remainging Time</th>
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
    Tournament: state.Tournament.Tournamentss
  }
};

const mapDispatchToProps = (dispatch) => ({
  action: {
    TournamentMatchAction: bindActionCreators(TournamentMatchAction, dispatch),
    TournamentAction: bindActionCreators(TournamentAction, dispatch)
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TournamentMatch)
